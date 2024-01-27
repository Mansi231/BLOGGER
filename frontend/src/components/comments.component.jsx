import React, { useContext } from 'react'
import { BlogContext } from '../pages/blog.page'
import CommentField from './comment-field.component'

const CommentsContainer = () => {

  let { commentsWrapper, setCommentsWrapper, blog: { title, content, banner, author: { personal_info: { fullname, username: author_username, profile_img } }, publishedAt } } = useContext(BlogContext)

  return (
    <div className={`max-sm:w-full fixed ${commentsWrapper ? 'top-0 sm:right-0' : 'top-[100%] right-[-100%]'} 
    duration-700 max-sm:right-0 sm:top-0 w-[30%] min-w-[350px] h-full z-50 bg-white shadow-2xl p-6 px-10 overflow-y-auto overflow-x-hidden`}>

      <div className='relative w-full '>
        <h1 className='text-xl font-medium'>Comments</h1>
        <p className='text-sm mt-2 w-[70%] line-clamp-2 text-gray-400'>{title}</p>
        <button className='absolute top-0 right-0 flex justify-center items-center w-11 h-11 rounded-full bg-gray-100' onClick={() => setCommentsWrapper((prevVal) => !prevVal)}>
          <i className="fi fi-br-cross-small text-xl mt-1"></i>
        </button>
      </div>

      <hr className='border-gray-100 my-6 w-[130%] -ml-10' />

      <CommentField action={'Comment'} />

    </div>
  )
}

export default CommentsContainer
