import asyncHandler from 'express-async-handler'
import { ValidateLogin, ValidateRegister } from '../validator/validator.js'
import bcrypt from 'bcrypt'
import User from '../schema/User.js'
import { nanoid } from 'nanoid'
import jwt from 'jsonwebtoken'
import { getAuth } from 'firebase-admin/auth'

const generateUsername = async (email, res) => {
    let username = email.split('@')[0]

    let userNameNotUnique = await User.exists({ "personal_info.username": username }).then((result) => {
        return result
    })
    userNameNotUnique ? username += nanoid().substring(0, 5) : '';
    return username
}

const dataToSend = (u) => {

    let access_token = jwt.sign({ id: u?._id }, process.env.JWT_SECRET, { expiresIn: '30d' })

    let { personal_info: { fullname, username, email, profile_img } } = u

    return { fullname, username, email, profile_img, access_token }
}

const registerUser = asyncHandler(async (req, res) => {

    let { error, value } = ValidateRegister(req?.body)

    if (error) return res.status(403).json({ error: error.details[0]?.message, value })

    let { password, email, fullname } = value


    bcrypt.hash(password, 10, async (err, hashed_password) => {
        let username = await generateUsername(email, res)
        let user = new User({
            personal_info: { fullname, email, username, password: hashed_password }
        })

        let userNameNotUnique = await User.exists({ "personal_info.email": email }).then((result) => {
            return result
        })
        console.log(userNameNotUnique, email);
        if (userNameNotUnique) {
            return res.status(500).json({ error: 'Email is already exists.' })
        }
        else {
            user.save().then((u) => {
                return res.status(200).json(dataToSend(u))
            }).catch((err) => {
                console.log(err);
                if (err?.code == 11000) return res.status(500).json({ error: 'Email is already exists.' })
                return res.status(500).json({ error: err?.message })
            })
        }

    })
})

const loginUser = asyncHandler(async (req, res) => {
    let { error, value } = ValidateLogin(req?.body)

    if (error) return res.status(403).json({ error: error.details[0]?.message, value })
    let { password, email } = value

    User.findOne({ "personal_info.email": email }).then((user) => {
        if (!user) return res.status(403).json({ error: 'Email not found.' })
        if (user?.google_auth) return res.status(403).json({ error: 'Account was created with Gogole.Try again login with Google.' })
        bcrypt.compare(password, user?.personal_info?.password, (err, result) => {
            if (err) return res.status(403).json({ error: 'Error occured while login.' })
            if (!result) return res.status(403).json({ error: 'Invalid Password' })
            else return res.status(200).json(dataToSend(user))
        })
    })

})

const googleAuth = asyncHandler(async (req,res) => {
    let { access_token } = req?.body
    getAuth().verifyIdToken(access_token).then(async(decodedUser) => {
        let { email, name ,picture} = decodedUser;

        picture = picture.replace('s96-c','s384-c')
        let user = await User.findOne({'personal_info.email':email}).select('personal_info.email personal_info.fullname personal_info.username personal_info.profile_img google_auth').then((u)=>{
            return u || null
        }).catch((err)=>{return res.status(500).json({error:err?.message})})

        if(user){
            if(!user?.google_auth){
                return res.status(403).json({error:'This email was sign up without google. please login with password.'})
            }
            else {
                return res.status(200).json(dataToSend(user)) 
            }
        }
        else{
            let username = await generateUsername(email)
            user = new User({
                personal_info:{fullname:name,username,email},
                google_auth:true
            })

            await user.save().then((u)=>{user=u}).catch((err)=>{return res.status(500).json({error:err?.message})})
        }

        return res.status(200).json(dataToSend(user))

    }).catch((err) => { return res.status(500).json({ error: err?.message }) })
})

export { registerUser, loginUser, googleAuth }