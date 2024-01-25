import express from 'express'
import { createBlog, getLatestBlogs, getSearchBlogs, getSearchUsers, getTrendingBlogs, getUserProfile } from '../controller/blogController.js'
import { verifyJWT } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/create-blog').post(verifyJWT,createBlog)
router.post('/latest-blog',getLatestBlogs)
router.get('/trending-blog',getTrendingBlogs)
router.post('/search-blogs',getSearchBlogs)
router.post('/search-users',getSearchUsers)
router.post('/get-profile',getUserProfile)

export default router