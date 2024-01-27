import React, { useContext, useState } from 'react'
import { UserContext } from '../context/userAuth.context';
import toast, { Toaster } from 'react-hot-toast';
import { BlogContext } from '../pages/blog.page';
import { useDispatch } from 'react-redux';
import { addComment } from '../redux/slices/commentSlice';
import { store } from '../redux/store/store';

const CommentField = ({ action }) => {

    const { userAuthDetail: { access_token ,username,fullname,profile_img} } = useContext(UserContext);
    let { blog: { _id, title, blog_id, activity , author: { _id: blog_author } }, setBlog, isLikedByUser, setLikedByUser, commentsWrapper, setCommentsWrapper } = useContext(BlogContext)

    const dispatch = useDispatch()

    const [comment, setComment] = useState('')

    const handleComment =async () => {
        if (!access_token) { return toast.error('Login first to leave a comment.', { id: 'authError', duration: 3000 }) }
        if (comment?.length < 1) return toast.error('Write something to leave a comment.', { id: 'authError', duration: 3000 })

        let commentObj = { _id, blog_author, comment }

        try {
            await dispatch(addComment({ commentObj, toast }))
            let { comment : {comment : resComment}} = store.getState()

            // resComment.commented_by = {personal_info :{ username,fullname,profile_img}}  

            let newCommentArr ;


            console.log(resComment,':: comment slice state ::');
        } catch (error) {
            console.error('Error inadding a comment !:', error);
        }

    }

    return (
        <>
            <textarea onChange={(e) => setComment(e.target.value)} value={comment} placeholder='Leave a comment ...' className='text-sm input-box pl-5 placeholder:text-gray-400 resize-none h-[150px] overflow-auto'></textarea>
            <button className='btn-dark mt-5 px-10' onClick={handleComment}>{action}</button>
        </>
    )
}

export default CommentField
