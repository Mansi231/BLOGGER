import React, { memo, useContext, useEffect } from 'react'
import { BlogContext } from '../pages/blog.page'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/userAuth.context'
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { isBlogLikedByUser, likeBlog } from '../redux/slices/blogSlice';
import { store } from '../redux/store/store';

const BlogInteraction = () => {

    let { blog, blog: { _id, title, blog_id, activity: { total_likes, total_comments }, activity, author: { personal_info: { username: author_username } } }, setBlog, isLikedByUser, setLikedByUser } = useContext(BlogContext)

    const { userAuthDetail: { username, access_token } } = useContext(UserContext);
    const dispatch = useDispatch()

    const isBlogLiked = async () => {
        try {
            await dispatch(isBlogLikedByUser({ obj: { _id }, toast }))
            let {blog:{isLikedBlog}} = store.getState()
            setLikedByUser(Boolean(isLikedBlog))
        } catch (error) {
            console.error('Error checking is blog liked !:', error);
        }
    }

    useEffect(() => {
        if (access_token) {
            isBlogLiked()   
        }
    }, [])

    const handleLike = async () => {
        if (access_token) {
            setLikedByUser(preVal => !preVal)
            !isLikedByUser ? total_likes++ : total_likes--
            setBlog({ ...blog, activity: { ...activity, total_likes } })
            try {
                await dispatch(likeBlog({ obj: { _id, isLikedByUser }, toast }))

            } catch (error) {
                console.error('Error fetching blog:', error);
            }
        }
        else {
            toast.error('please login to like this blog')
        }
    }

    return (
        <>
            <Toaster />
            <hr className='border-gray-100 my-2' />
            <div className='flex gap-6 justify-between'>

                <div className='flex gap-3 items-center'>
                    <button className={`w-9 h-9 rounded-full flex items-center justify-center  ${isLikedByUser ? 'bg-red-100/80 text-red-600' : 'bg-gray-200/80'}`} onClick={handleLike}>
                        <i className={`fi fi-${isLikedByUser ? 'sr' : 'rr'}-heart`}></i>
                    </button>
                    <p className='text-xl text-gray-400'>{total_likes}</p>

                    <button className='w-9 h-9 rounded-full flex items-center justify-center bg-gray-200/80'>
                        <i className="fi fi-rr-comment-dots"></i>
                    </button>
                    <p className='text-xl text-gray-400'>{total_comments}</p>
                </div>

                <div className='flex gap-6 items-center'>
                    {username == author_username && <Link to={`/editor/${blog_id}`} className='underline hover:text-purple-400'>Edit</Link>}
                    <Link to={`https://twitter.com/intent/tweet?text=Read ${title}&url=${location.href}`}><i className="fi fi-brands-twitter text-xl hover:text-[#1DA1F2] hover:transition-all hover:duration-300"></i></Link>
                </div>
            </div>
            <hr className='border-gray-100 my-2' />
        </>
    )
}

export default memo(BlogInteraction)
