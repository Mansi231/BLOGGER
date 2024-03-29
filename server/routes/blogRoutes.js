import express from 'express'
import { createBlog, getBlog, getLatestBlogs, getSearchBlogs, getSearchUsers, getTrendingBlogs, getUserProfile, isBlogLikedByUser, likeBlog } from '../controller/blogController.js'
import { verifyJWT } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/create-blog').post(verifyJWT,createBlog)
router.post('/latest-blog',getLatestBlogs)
router.get('/trending-blog',getTrendingBlogs)
router.post('/search-blogs',getSearchBlogs)
router.post('/search-users',getSearchUsers)
router.post('/get-profile',getUserProfile)
router.post('/get-blog',getBlog)
router.post('/like-blog',verifyJWT,likeBlog)
router.post('/isliked-by-user',verifyJWT,isBlogLikedByUser)

export default router