import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../services/routes'
import logo from '../imgs/logo.png'
import AnimationWrapper from '../common/page_animation'
import defaultBanner from '../imgs/blog_banner.png'
import { useDispatch, useSelector } from 'react-redux'
import { getImageUploadUrl } from '../redux/slices/authSlice'
import toast, { Toaster } from 'react-hot-toast';

const BlogEditor = () => {

    const dispatch = useDispatch()
    const { imageUrl , isImageUploading} = useSelector((state) => state?.auth)
    let blogBannerRef = useRef()

    let loadingToast;
    useEffect(() => {
        if (imageUrl != null){ blogBannerRef.current.src = imageUrl;toast.dismiss(loadingToast);toast.success('uploaded 👍')}
    }, [imageUrl])


    const handleBannerUpload = async (e) => {
        let image = e.target.files[0]
        let imgUrl = null;
        if (image) {
            loadingToast = toast.loading('uploading !')
            let formData = new FormData()
            formData.append('image', image);

            dispatch(getImageUploadUrl({ toast, formData }))
        }
        else return imgUrl

    }

    return (
        <>
            <Toaster />
            <nav className='navbar'>
                <Link to={ROUTES.HOME} className='h-7 w-16 flex-none'>
                    <img src={logo} alt="" className='h-fit w-fit' />
                </Link>
                <p className='text-sm max-md:hidden w-full text-black line-clamp-1'>New Blog</p>

                <div className='flex gap-4 ml-auto'>
                    <button className='btn-dark py-2'>Publish</button>
                    <button className='btn-light py-2'>Save Draft</button>
                </div>
            </nav>

            <AnimationWrapper>
                <section className='mt-5'>
                    <div className='mx-auto max-w-[900px] w-full'>
                        <div className='relative aspect-video hover:opacity-80 bg-white border border-gray-100'>
                            <label htmlFor='uploadBanner'>
                                <img ref={blogBannerRef} src={defaultBanner} alt="" className='z-20 h-full w-full object-contain' />
                                <input type="file" id='uploadBanner' accept='.png, .jpg, .jpeg' hidden onChange={handleBannerUpload} />
                            </label>
                        </div>
                    </div>
                </section>
            </AnimationWrapper>
        </>
    )
}

export default BlogEditor
