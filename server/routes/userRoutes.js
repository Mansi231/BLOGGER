import express from 'express'
import { loginUser, registerUser } from '../controller/userController.js'

const router = express.Router()

router.route('/signup').post(registerUser)
router.post('/signin',loginUser)

export default router