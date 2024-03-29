import React, { memo, useContext, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ROUTES } from '../services/routes'
import logo from '../imgs/logo.png'
import AnimationWrapper from '../common/page_animation'
import defaultBanner from '../imgs/blog_banner.png'
import toast, { Toaster } from 'react-hot-toast';
import { EditorContext } from '../pages/editor.page'
import EditorJs from '@editorjs/editorjs'
import { tools } from './tools.component'
import { UploadImage } from '../common/aws'
import useCustomEditor from '../custom_hooks/useCustomEditor'
import { useDispatch } from 'react-redux'
import { createBlog } from '../redux/slices/blogSlice'

const BlogEditor = () => {

    let { blog, blog: { title, des, tags, content, banner }, setBlog, textEditor, setEditorState } = useContext(EditorContext)
    let {blog_id} = useParams()

    useCustomEditor();

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleBannerUpload = async (e) => {
        let image = e.target.files[0]
        if (image) {
            let loadingToast = toast.loading('uploading !')
            let formData = new FormData()
            formData.append('image', image);

            UploadImage(formData, toast).then((url) => {
                toast.dismiss(loadingToast);
                toast.success('uploaded 👍');
                setBlog({ ...blog, banner: url })

            }).catch(err => console.log(err))
        }

    }

    const handleTitleKeyDown = (e) => {
        // enter key pressed
        if (e.keyCode == 13) e.preventDefault();
    }

    const handleTitlechange = (e) => {
        let input = e.target;
        input.style.height = 'auto';
        input.style.height = `${input?.scrollHeight}px`;

        setBlog({ ...blog, title: input.value })
    }

    const handleBannerError = (e) => {
        let img = e.target
        img.src = defaultBanner
    }

    const handlePublishEvent = async () => {

        if (!banner.length) return toast.error('Upload a blog banner before publish it', { duration: 3000, id: 'bannerError' })
        if (!title.length) return toast.error('Write a blog title before publish it', { duration: 3000, id: 'titleError' })
        textEditor?.current?.save().then((data) => {
            if (data.blocks.length) {
                setBlog({ ...blog, content: data })
                setEditorState('publish')
            }
            else {
                return toast.error('Write something in your blog to publish it', { duration: 3000, id: 'blockError' })
            }
        }).catch((err) => console.log(err, ': err in text editor saving'))

    }

    const handlePublishRes = (e) => {
        toast.success('Saved! 👍')
        navigate(ROUTES.HOME)
      }

    const handleSaveDraft = async (e) => {
        if (e.target.className.includes('disable')) return

        if (!title?.length) return toast.error('Write a blog title before saving as a draft', { id: 'titleError', duration: 2500 })

        textEditor?.current?.save().then(async(content) => {
            if (content.blocks.length) {
                setBlog({ ...blog, content: content })
                setEditorState('publish')

                let loadingToast = toast.loading('Saving Draft...')
                e.target.classList?.add('disable')
        
                let blogObj = { title, content, banner, draft: true ,id:blog_id}
                await dispatch(createBlog({ blogObj, toast, handlePublishRes: handlePublishRes(e) }))
        
                e.target.classList.remove('disable')
                toast.dismiss(loadingToast);
            }
            else {
                return toast.error('Write something in your blog to publish it', { duration: 3000, id: 'blockError' })
            }
        }).catch((err) => console.log(err, ': err in text editor saving'))

       
    }

    return (
        <>
            <Toaster />
            <nav className='navbar'>
                <Link to={ROUTES.HOME} className='h-7 w-16 flex-none'>
                    <img src={logo} alt="" className='h-fit w-fit' />
                </Link>
                <p className='text-sm max-md:hidden w-full text-black line-clamp-1'>{
                    title?.length ? title : 'New Blog'
                }</p>

                <div className='flex gap-4 ml-auto'>
                    <button className='btn-dark py-2' onClick={handlePublishEvent}>Publish</button>
                    <button className='btn-light py-2' onClick={handleSaveDraft}>Save Draft</button>
                </div>
            </nav>

            <AnimationWrapper>
                <section className='mt-5'>
                    <div className='mx-auto max-w-[900px] w-full px-10'>
                        <div className='relative aspect-video hover:opacity-80 bg-white border border-gray-100'>
                            <label htmlFor='uploadBanner'>
                                <img
                                    src={banner}
                                    alt=""
                                    onError={handleBannerError}
                                    className='z-20 h-full w-full' />
                                <input type="file" id='uploadBanner' accept='.png, .jpg, .jpeg' hidden onChange={handleBannerUpload} />
                            </label>
                        </div>
                        <textarea defaultValue={title} placeholder='Blog Title' className=' text-4xl font-medium w-full h-16 outline-none resize-none mt-10 leading-tight placeholder:opacity-40' onKeyDown={handleTitleKeyDown} onChange={handleTitlechange}>

                        </textarea>

                        <hr className='w-full opacity-50 my-2' />

                        <div id="textEditor" className='font-gelasio w-full'>

                        </div>
                    </div>
                </section>
            </AnimationWrapper>
        </>
    )
}

export default memo(BlogEditor)
