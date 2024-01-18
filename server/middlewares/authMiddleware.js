import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../schema/User.js';

const verifyJWT = asyncHandler(async (req,res,next)=>{
    let token;
    if(req?.headers?.authorization && req?.headers?.authorization?.startsWith('Bearer')){
        try {
            token = req?.headers?.authorization?.split(' ')[1]
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.user = await User.findById(decoded?.id)
            next()
        } catch (error) {
            return res.status(401).json({error:"Not authorized, token failed"})
        }
    }
    if(!token) res.status(401).json({error:'not authorized, token failed'})
})

export {verifyJWT}