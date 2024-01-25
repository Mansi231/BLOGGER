import React from 'react'
import { getDay } from '../common/date'
import { Link } from 'react-router-dom'

const BlogPostCard = ({ content, author }) => {

    let { title, blog_id: id, des, banner, tags, publishedAt, activity: { total_likes } } = content
    let { fullname, username, profile_img } = author

    return (
        <Link to={`/blog/${id}`} className='flex gap-8 items-center border-b border-gray-200 mb-4 pb-5'>
            <div className='w-full'>
                <div className='flex items-center gap-2 mb-7'>
                    <img src={profile_img} className='w-6 h-6 rounded-full' />
                    <p className='line-clamp-1 text-sm'>{fullname} @ {username}</p>
                    <p className='min-w-fit'>{getDay(publishedAt)}</p>
                </div>
                <h1 className='blog-title'>{title}</h1>
                <p className='my-3 text-lg text-gray-600 font-gelasio leading-7 max-sm:hidden md:max-[1100px]:hidden line-clamp-2'>{des}</p>

                <div className='flex gap-4 mt-7'>
                    <span className='btn-light py-1 px-4'>{tags && tags[0]}</span>
                    <span className='ml-3 flex items-center gap-2 text-gray-400'><i className="fi fi-rr-heart"></i>{total_likes}</span>
                </div>
            </div>

            <div className='h-28 aspect-square bg-gray-100'>
                <img src={banner} className='w-full h-full aspect-square object-cover' />
            </div>

        </Link>
    )
}

export default BlogPostCard
