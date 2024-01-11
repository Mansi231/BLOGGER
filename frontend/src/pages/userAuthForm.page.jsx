import React, { useContext, useEffect, useRef } from 'react'
import InputBox from '../components/input.component'
import google from '../imgs/google.png'
import { Link } from 'react-router-dom'
import { ROUTES } from '../services/routes'
import AnimationWrapper from '../common/page_animation'
import toast, { Toaster } from 'react-hot-toast';
import {useDispatch, useSelector} from 'react-redux'
import { userAuth, userGoogeAuth } from '../redux/slices/authSlice'
import { UserContext } from '../context/userAuth.context'
import { authWithGoogle } from '../common/firebase'

const UserAuthForm = ({ type }) => {

    const {userAuthDetail,setUserAuthDetail} = useContext(UserContext)

    const dispatch = useDispatch()
    const {user,isError} = useSelector(state=>state?.auth)

    const authApi = (values) =>{
        dispatch(userAuth({values,route:type.replace('-',''),toast,setUserAuthDetail}))
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

        let form = new FormData(formElement)
        let formValues = {}

        for (let [key, value] of form.entries()) {
            formValues[key] = value
        }
        let { fullname, email, password } = formValues

        if (fullname?.length < 3 && fullname) return toast.error('Fullname must be at least 3 lettrs long', {duration:2000,id:'fullname'})
        if (!email?.length) return toast.error('Enter Email', {duration:2000,id:'email'})
        if (!emailRegex.test(email)) return toast.error('Email is Invalid', {duration:2000,id:'invalidemail'})
        if (!passwordRegex.test(password)) return toast.error('Password should be 6 to 20 charactes long with a numeric , 1 lowercase and 1 uppercase letters', {duration:2000,id:'password'})

        authApi(formValues)
    }

    const handleGoogleAuth = (e) =>{
        e.preventDefault()
        authWithGoogle().then((u)=>{
            dispatch(userGoogeAuth({token:u?.accessToken,setUserAuthDetail,toast}))
        }).catch((err)=>{ toast.error('trouble with google login');return err })
    }

    return (
        <AnimationWrapper keyValue={type}>
            <section className='h-cover flex items-center justify-center'>
                <form id='formElement' className='max-w-[400px] w-[80%] flex  justify-center items-center flex-col'>

                    <h1 className='text-4xl capitalize font-gelasio mb-16'>{type == 'sign-in' ? 'Welcom back' : 'join us today'}</h1>

                    {type != 'sign-in' ? <InputBox type={'text'} placeholder={'Full Name'} name={'fullname'} icon={'fi fi-rr-user'} /> : ''}
                    <InputBox type={'email'} id={'email'} placeholder={'Email'} name={'email'} icon={'fi fi-rr-envelope'} />
                    <InputBox type={'password'} placeholder={'Password'} name={'password'} icon={'fi fi-rr-key'} />
                    <button className='btn-dark center mt-10 w-[50%]' type='submit' onClick={(e) => handleSubmit(e)}>{type.replace('-', ' ')}</button>
                    <Toaster />

                    <div className='relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold'>
                        <hr className='w-1/2 border-black' />
                        <p>or</p>
                        <hr className='w-1/2 border-black' />
                    </div>

                    <button className='btn-dark items-center flex gap-3 w-[90%] justify-center center' onClick={handleGoogleAuth}>
                        <img src={google} alt="google" className='w-7 h-7 rounded-full' />
                        continue with google
                    </button>
                    {
                        type == 'sign-in' ?
                            <p className='mt-8 text-gray-400 text-center text-sm'>
                                Don't have an account ?
                                <Link to={ROUTES.SIGN_UP} className='underline text-sm text-black ml-1'>
                                    Join us today
                                </Link>
                            </p> :
                            <p className='mt-8 text-gray-400 text-center text-sm'>
                                Already a member ?
                                <Link to={ROUTES.SIGN_IN} className='underline text-sm text-black ml-1 cursor-pointer'>
                                    Sign in here.
                                </Link>
                            </p>
                    }
                </form>
            </section>
        </AnimationWrapper>
    )
}

export default UserAuthForm
