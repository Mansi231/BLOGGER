import asyncHandler from "express-async-handler";
import Comment from '../schema/Comment.js'
import Blog from "../schema/Blog.js";
import Notification from "../schema/Notification.js";

const AddComment = asyncHandler(async (req, res) => {
    let user_id = req?.user?._id
    let { comment, _id, replying_to, blog_author } = req?.body

    if (!comment?.length) return res.status(500).json({ error: 'Write something to leave a comment.' })

    // create a comment

    let commentObj = new Comment({ blog_author, blog_id: _id, comment, commented_by: user_id })
    commentObj.save().then(commentFile => {

        let { comment, commentedAt, children } = commentFile;

        Blog.findOneAndUpdate({ _id }, { $push: { 'comments': commentFile?._id } , $inc : {'activity.total_comments':1} , 'activity.toatal_parent_comments': 1}).then((blog) => {}).catch(error => res.status(500).json({ error: error?.message }))

        let notificationObj = {type:'comment',blog :_id , notification_for :blog_author,user:user_id,comment:commentFile?._id}

        new Notification(notificationObj).save().then((notification) => {}).catch(error => res.status(500).json({ error: error?.message }))
         
        return res.status(200).json({comment,commentedAt , _id:commentFile?._id , user_id , children ,commented_by : req?.user?.personal_info})

    }).catch(error => res.status(500).json({ error }))
})

export { AddComment }