import React, { memo, useContext } from 'react'
import AnimationWrapper from '../common/page_animation'
import { Toaster, toast } from 'react-hot-toast'
import { EditorContext } from '../pages/editor.page'
import Tag from './tags.component'
import { useDispatch } from 'react-redux'
import { createBlog } from '../redux/slices/blogSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { ROUTES } from '../services/routes'

const PublishForm = () => {

  let characterLimit = 200;
  let tagLimit = 10;
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { setEditorState, blog: { title, des, tags, content, banner }, setBlog, blog } = useContext(EditorContext)
  let { blog_id } = useParams()
  const handleCloseEvent = () => { setEditorState('editor') }

  const handleBlogTitleChange = (e) => {
    let input = e.target;
    setBlog({ ...blog, title: input.value })
  }

  const handleBlogDesChange = (e) => {
    let input = e.target;
    setBlog({ ...blog, des: input.value })
  }

  const handleTitleKeyDown = (e) => {
    // enter key pressed
    if (e.keyCode == 13) e.preventDefault();
  }

  const handleKeyDown = (e) => {
    if (e.keyCode == 13 || e.keyCode == 188) {
      e.preventDefault();
      let tag = e.target.value;
      if (tags.length < tagLimit) {
        if (!tags.includes(tag) && tag.length) {
          setBlog({ ...blog, tags: [...tags, tag] })
        }
      }
      else {
        toast.error(`You can add maximum ${tagLimit} tags`)
      }
      e.target.value = ''
    }
  }

  const handlePublishRes = (e,loadingToast) => {
    e.target.classList.remove('disable')
    toast.dismiss(loadingToast);
    toast.success('Published! 👍')
    navigate(ROUTES.HOME)
  }

  const publishBlog = async (e) => {
    if (e.target.className.includes('disable')) return

    if (!title?.length) return toast.error('Write a blog title before publishing', { id: 'titleError', duration: 2500 })
    if (!des?.length || des?.length > characterLimit) return toast.error(`Write a description about your blog within ${characterLimit} characters to publish`, { id: 'desError', duration: 2500 })
    if (!tags?.length) return toast.error(`Enter atleast 1 tag to rank your blog`, { id: 'tagError', duration: 2500 })

    let loadingToast = toast.loading('Publishing...')
    e.target.classList?.add('disable')

    let blogObj = { title, des, tags, content, banner, draft: false ,id:blog_id}
    await dispatch(createBlog({ blogObj, toast, handlePublishRes: handlePublishRes(e,loadingToast) }))

  }

  return (
    <AnimationWrapper>
      <section className='w-screen min-h-screen grid items-center lg:grid-cols-2 py-16 lg:gap-2 px-5'>
        <Toaster />
        <button className='w-12 h-12 absolute right-[5vw] z-10 top-[7%] lg:top-[10%]' onClick={handleCloseEvent}>
          <i className="fi fi-br-cross"></i>
        </button>

        <div className='max-w-[550px] center'>
          <p className='text-gray-200 mb-1'>Preview</p>
          <div className='w-full aspect-video rounded-lg overflow-hidden bg-gray-50 mt-4'>
            <img src={banner} alt="" className='w-full h-full' />
          </div>
          <h1 className='text-4xl font-medium mt-2 leading-tight line-clamp-2 break-words'>{title}</h1>
          <p className='font-gelasio line-clamp-2 text-xl leading-7 mt-4'>{des}</p>
        </div>

        <div className='border-gray-100 lg:pl-4'>
          <p className='text-gray-400 mb-2 mt-9'>Blog Title</p>
          <input className='input-box pl-4' type="text" placeholder='Blog Title' defaultValue={title} onChange={handleBlogTitleChange} />

          <p className='text-gray-400 mb-2 mt-9'>Short description about your blog</p>
          <textarea className='h-40 resize-none leading-7 input-box pl-4' maxLength={characterLimit} defaultValue={des} onChange={handleBlogDesChange} onKeyDown={handleTitleKeyDown}></textarea>
          <p className='mt-1 text-gray-400 text-sm text-right'>{characterLimit - des?.length} characters left</p>

          <p className='text-gray-400 mb-2 mt-9'>Topics - (Helps searching and ranking your blog post)</p>

          <div className='relative input-box pl-2 py-2 pb-4'>
            <input type="text" placeholder='Topics' className='sticky input-box bg-white top-0 left-0 pl-4 mb-3 focus:bg-white' onKeyDown={handleKeyDown} />
            {
              tags?.map((tag, i) => {
                return <Tag tag={tag} key={i} tagIndex={i} />
              })
            }
          </div>
          <p className='mt-1 mb-4 text-gray-400 text-right text-sm '>{tagLimit - tags?.length} Tags left</p>

          <button className='btn-dark px-8' onClick={publishBlog}>Publish</button>
        </div>

      </section>
    </AnimationWrapper>
  )
}

export default memo(PublishForm)
