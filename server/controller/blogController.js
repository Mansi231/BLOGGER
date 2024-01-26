import asyncHandler from 'express-async-handler'
import { ValidateBlog } from '../validator/validator.js'
import { nanoid } from 'nanoid'
import Blog from '../schema/Blog.js'
import User from '../schema/User.js'
import Notification from '../schema/Notification.js'

const createBlog = asyncHandler(async (req, res) => {
    let authorId = req?.user?._id
    let { error, value } = ValidateBlog(req?.body)

    if (error) return res.status(403).json({ error: error.details.map(({ message }) => message), value })

    let { title, des, tags, content, banner, draft, id } = req?.body
    tags = tags?.map(tag => tag.toLowerCase())

    let blog_id = id || title.replace(/[^a-zA-Z0-9]/g, ' ').replace(/\s+/g, '-').trim() + nanoid()

    if (id) {
        Blog.findOneAndUpdate({ blog_id }, { title, des, banner, content, tags, draft: draft ? draft : false }).then((blog) => {
            return res.status(200).json({ id: blog_id })
        }).catch(error => res.status(500).json({ error: error?.message }))
    }
    else {
        let blog = new Blog({
            title, des: des || '', content, banner, tags: tags || [], author: authorId, blog_id, draft: Boolean(draft)
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

        }).catch(error => res.status(500).json({ error: error?.message }))
    }
})

const getLatestBlogs = asyncHandler(async (req, res) => {
    let { page } = req?.body
    let maxLimit = 5

    Blog.countDocuments({ draft: false }).then((totalDocs) => {
        Blog.find({ draft: false }).populate('author', 'personal_info.fullname personal_info.profile_img personal_info.username -_id').sort({ 'publishedAt': -1 }).select('blog_id title banner des activity tags publishedAt -_id').skip((page - 1) * maxLimit).limit(maxLimit).then((data) => {
            return res.status(200).json({ data, totalDocs })
        }).catch(error => {
            return res.status(500).json({ error: error?.message })
        })
    }).catch(error => {
        return res.status(500).json({ error: error?.message })
    })

})

const getTrendingBlogs = asyncHandler(async (req, res) => {
    Blog.find({ draft: false }).populate('author', 'personal_info.fullname personal_info.profile_img personal_info.username -_id').sort({ 'activity.total_read': -1, 'activity.total_likes': -1, 'publishedAt': -1 }).select('blog_id title  publishedAt -_id').limit(5).then((data) => res.status(200).json({ data })).catch(error => res.status(500).json({ error }))
})

const getSearchBlogs = asyncHandler(async (req, res) => {
    let { author, tag, query, page, limit, eliminate_blog } = req?.body
    let maxLimit = limit || 2

    let findQuery;
    if (tag) { findQuery = { tags: tag, draft: false, blog_id: { $ne: eliminate_blog } } }
    else if (query) { findQuery = { title: new RegExp(query, 'i'), draft: false } }
    else if (author) { findQuery = { author, draft: false } }

    Blog.countDocuments(findQuery).then((totalDocs) => {
        Blog.find(findQuery).populate('author', 'personal_info.username personal_info.fullname personal_info.profile_img -_id').sort({ 'publishedAt': -1 }).select('blog_id title banner des activity tags publishedAt -_id').skip((page - 1) * maxLimit).limit(maxLimit).then((data) => {
            return res.status(200).json({ data, totalDocs })
        }).catch(error => {
            return res.status(500).json({ error: error?.message })
        })
    }).catch(error => {
        return res.status(500).json({ error: error?.message })
    })

})

const getSearchUsers = asyncHandler(async (req, res) => {
    let { query } = req?.body
    User.find({ 'personal_info.username': new RegExp(query, 'i') }).limit(50).select('personal_info.fullname personal_info.username personal_info.profile_img -_id').then((data) => {
        return res.status(200).json({ data })
    }).catch((error) => {
        return res.status(500).json({ error: error?.message })
    })
})

const getUserProfile = asyncHandler(async (req, res) => {
    let { username } = req?.body

    User.findOne({ 'personal_info.username': username }).select('-personal_info.password -google_auth -updatedAt -blogs').then((data) => {
        return res.status(200).json({ data })
    }).catch((error) => {
        return res.status(500).json({ error: error?.message })
    })
})

const getBlog = asyncHandler(async (req, res) => {
    let { blog_id, draft, mode } = req?.body
    let incrementVal = mode != 'edit' ? 1 : 0;

    Blog.findOneAndUpdate({ blog_id }, { $inc: { 'activity.total_reads': incrementVal } })
        .populate('author', 'personal_info.fullname personal_info.username personal_info.profile_img')
        .select('title des content banner activity publishedAt blog_id tags')
        .then((data) => {

            User.findOneAndUpdate({ 'personal_info.username': data.author.personal_info?.username }, { $inc: { 'account_info.total_reads': incrementVal } }).catch((error) => {
                return res.status(500).json({ error: error?.message })
            })
            if (data.draft && !draft) return res.status(500).json({ error: 'You can not access draft blog' })
            return res.status(200).json({ data })

        }).catch((error) => {
            return res.status(500).json({ error: error?.message })
        })
})

// Like Blog

const likeBlog = asyncHandler(async (req, res) => {

    let user_id = req?.user?._id
    let { _id, isLikedByUser } = req?.body
    let incrementVal = !isLikedByUser ? 1 : -1;

    Blog.findOneAndUpdate({ _id }, { $inc: { 'activity.total_likes': incrementVal } })
        .populate('author', 'personal_info.fullname personal_info.username personal_info.profile_img')
        .select('title des content banner activity publishedAt blog_id tags')
        .then((data) => {
            if (!isLikedByUser) {
                let like = new Notification({
                    type: 'like', blog: _id, notification_for: data?.author, user: user_id
                })

                like.save().then((likeNotification) => {
                    return res.status(200).json({ liked_by_user: true })
                }).catch((error) => {
                    return res.status(500).json({ error: error?.message })
                })
            }
            else {
                Notification.findOneAndDelete({ user: user_id, type: 'like', blog: _id }).then((likeNotification) => {
                    return res.status(200).json({ liked_by_user: false })
                }).catch((error) => {
                    return res.status(500).json({ error: error?.message })
                })
            }

        }).catch((error) => {
            return res.status(500).json({ error: error?.message })
        })
})

// is blog liked by logged in user

const isBlogLikedByUser = asyncHandler(async (req, res) => {
    let user = req?.user?._id
    let { _id } = req?.body

    Notification.exists({ user, blog: _id, type: 'like' }).then((result) => {
        return res.status(200).json({ result })
    }).catch((error) => {
        return res.status(500).json({ error: error?.message })
    })

})

export { createBlog, getLatestBlogs, getTrendingBlogs, getSearchBlogs, getSearchUsers, getUserProfile, getBlog, likeBlog, isBlogLikedByUser }