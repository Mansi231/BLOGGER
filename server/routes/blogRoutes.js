import express from 'express'
import { createBlog } from '../controller/blogController.js'
import { verifyJWT } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/create-blog').post(verifyJWT,createBlog)

export default router