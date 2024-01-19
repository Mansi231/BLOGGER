import asyncHandler from 'express-async-handler'
import { ValidateBlog } from '../validator/validator.js'
import { nanoid } from 'nanoid'
import Blog from '../schema/Blog.js'
import User from '../schema/User.js'

const createBlog = asyncHandler(async (req, res) => {
    let authorId = req?.user?._id
    let { error, value } = ValidateBlog(req?.body)

    if (error) return res.status(403).json({ error: error.details.map(({ message }) => message), value })

    let { title, des, tags, content, banner, draft } = req?.body
    tags = tags?.map(tag => tag.toLowerCase())

    let blog_id = title.replace(/[^a-zA-Z0-9]/g, ' ').replace(/\s+/g, '-').trim() + nanoid()

    let blog = new Blog({
        title, des: des || '', content, banner, tags : tags || [], author: authorId, blog_id, draft: Boolean(draft)
    })
    blog.save().then((blog) => {
        let incrementPost = Boolean(draft) ? 0 : 1
        User.findOneAndUpdate({ _id: authorId },
            {
                $inc: { 'account_info.total_posts': incrementPost },
                $push: { 'blogs': blog?._id }
            }).then(user => {
                return res.status(200).json({ id: blog_id })
            }).catch(error => res.status(500).json({ error }))
            
    }).catch(error => res.status(500).json({ error }))
})

export { createBlog }