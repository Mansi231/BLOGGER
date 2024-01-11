import express from 'express'
import { googleAuth, loginUser, registerUser } from '../controller/userController.js'

const router = express.Router()

router.route('/signup').post(registerUser)
router.post('/signin',loginUser)
router.post('/google-auth',googleAuth)

export default router