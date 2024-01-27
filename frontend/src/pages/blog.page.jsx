import React, { createContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getBlog, getSearchBlogsByCategory } from '../redux/slices/blogSlice'
import { store } from '../redux/store/store'
import AnimationWrapper from '../common/page_animation'
import Loader from '../components/loader.component'
import { getDay } from '../common/date'
import BlogInteraction from '../components/blog-interaction.component'
import BlogPostCard from '../components/blog-post.component'
import PageNotFound from './404.page'
import toast, { Toaster } from 'react-hot-toast';
import BlogContent from '../components/blog-content.component'
import CommentsContainer from '../components/comments.component'

export const blogStructure = { title: '', des: '', content: [], tags: [], author: { personal_info: { fullname: '', username: '', profile_img: '', bio: "'" } }, banner: '', publishedAt: '' }

export const BlogContext = createContext({})

const BlogPage = () => {

    let { blog_id } = useParams()
    const dispatch = useDispatch()

    const [blog, setBlog] = useState(blogStructure)
    const [similarBlogs, setSimilarBlogs] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isLikedByUser,setLikedByUser] = useState(false)
    const [commentsWrapper,setCommentsWrapper] = useState(false)
    const [totalParentCommentsLoaded,setTotalParentCommentsLoaded] = useState(0)
    
    let { title, content, banner, author: { personal_info: { fullname, username: author_username, profile_img } }, publishedAt } = blog

    const fetchBlog = async () => {
        try {
            await dispatch(getBlog({ blog_id, toast }))
            let { blog: { blog } } = store.getState()
            if (blog != null) {
                setBlog(blog)
                await dispatch(getSearchBlogsByCategory({ tag: blog?.tags[0], limit: 6, eliminate_blog: blog_id }));
                let { blog: { searchBlogs } } = store.getState();
                if (searchBlogs?.data?.length) setSimilarBlogs(searchBlogs.data)
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error('Error fetching blog:', error);
        }
    }

    useEffect(() => {
        resetState()
        fetchBlog()
    }, [blog_id])

    const resetState = () => {
        setBlog(blogStructure)
        setSimilarBlogs(null)
        setLoading(true)
        setLikedByUser(false)
        setCommentsWrapper(false)
        setTotalParentCommentsLoaded(0)
    }

    return (
        <AnimationWrapper>
            <Toaster />
            {
                loading ? <Loader /> :
                author_username?.length ?
                        <BlogContext.Provider value={{ blog, setBlog , isLikedByUser,setLikedByUser ,commentsWrapper,setCommentsWrapper,totalParentCommentsLoaded,setTotalParentCommentsLoaded}}>
                            <CommentsContainer/>
                            <div className='max-w-[900px] center py-10 max-lg:px-[5vw]'>
                                <img src={banner} alt="" className='aspect-video' />
                                <div className='mt-12'>
                                    <h2 className='text-2xl font-medium'>{title}</h2>
                                    <div className='flex max-sm:flex-col justify-between my-8'>
                                        <div className='flex gap-5 items-start'>
                                            <img src={profile_img} alt="" className='w-12 h-12 rounded-full' />
                                            <p className='capitalize'>
                                                {fullname}
                                                <br />
                                                @
                                                <Link to={`/user/${author_username}`} className='underline'>{author_username}</Link>
                                            </p>
                                        </div>
                                        <p className='text-gray-500 text-sm opacity-75 max-sm:mt-6 max-sm:ml-12 max-sm:pl-5'>Published on {getDay(publishedAt)}</p>
                                    </div>
                                </div>

                                <BlogInteraction />

                                {/* Blog content */}
                                <div className='my-12 font-gelasio blog-page-content'>
                                    {
                                        content[0].blocks.map((block,i)=>{
                                            return (
                                                <div key={i} className='my-4 md:my-8'>
                                                    <BlogContent block={block}/>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                                <BlogInteraction />

                                {
                                    similarBlogs != null && similarBlogs?.length ?
                                        <>
                                            <h1 className='mt-12 text-2xl mb-10 font-medium'>Similar Blogs</h1>
                                            {
                                                similarBlogs?.map((blog, i) => {
                                                    let { author: { personal_info } } = blog
                                                    return <AnimationWrapper key={i} transition={{ duration: 1, delay: i * .08 }}>
                                                        <BlogPostCard content={blog} author={personal_info} />
                                                    </AnimationWrapper>
                                                })
                                            }
                                        </> :
                                        null
                                }
                            </div>
                        </BlogContext.Provider> :
                        <PageNotFound />
            }
        </AnimationWrapper>
    )
}

export default BlogPage
