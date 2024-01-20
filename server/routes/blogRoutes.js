import express from 'express'
import { createBlog, getLatestBlogs, getSearchBlogs, getTrendingBlogs } from '../controller/blogController.js'
import { verifyJWT } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/create-blog').post(verifyJWT,createBlog)
router.get('/latest-blog',getLatestBlogs)
router.get('/trending-blog',getTrendingBlogs)
router.post('/search-blogs',getSearchBlogs)

export default router