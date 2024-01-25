import React, { useContext } from 'react'
import { BlogContext } from '../pages/blog.page'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/userAuth.context'

const BlogInteraction = () => {

    let { blog: { title, blog_id, activity: { total_likes, total_comments }, activity, author: { personal_info: { username: author_username } } }, setBlog } = useContext(BlogContext)
    const { userAuthDetail: { username } } = useContext(UserContext);

    return (
        <>
            <hr className='border-gray-100 my-2' />
            <div className='flex gap-6 justify-between'>

                <div className='flex gap-3 items-center'>
                    <button className='w-9 h-9 rounded-full flex items-center justify-center bg-gray-200/80'>
                        <i className="fi fi-rr-heart"></i>
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

export default BlogInteraction
