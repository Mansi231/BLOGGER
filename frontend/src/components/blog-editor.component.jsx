import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../services/routes'
import logo from '../imgs/logo.png'
import AnimationWrapper from '../common/page_animation'
import defaultBanner from '../imgs/blog_banner.png'

const BlogEditor = () => {
    
    const handleBannerUpload = (e) =>{
        let img = e.target.files[0]
        console.log(img);
    }

    return (
        <>
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
                                <img src={defaultBanner} alt="" className='z-20'/>
                                <input type="file" id='uploadBanner' accept='.png, .jpg, .jpeg' hidden onChange={handleBannerUpload}/>
                            </label>
                        </div>
                    </div>
                </section>
            </AnimationWrapper>
        </>
    )
}

export default BlogEditor
