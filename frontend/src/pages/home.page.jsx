import React, { useEffect, useState } from 'react'
import AnimationWrapper from '../common/page_animation'
import InPageNavigation, { activeTabRef } from '../components/inpage-navigation.component'
import { useDispatch, useSelector } from 'react-redux'
import { getLatestBlogs, getSearchBlogsByCategory, getTrendingBlogs } from '../redux/slices/blogSlice'
import toast from 'react-hot-toast'
import { store } from '../redux/store/store'
import Loader from '../components/loader.component'
import BlogPostCard from '../components/blog-post.component'
import MinimalBlogPost from '../components/nobanner-blog-post.component'

const HomePage = () => {

  const [blogs, setBlogs] = useState(null)
  const [trendingBlogs, setTrendingBlogs] = useState(null)
  const [pageState, setPageState] = useState('home')

  let categories = ['space', 'travel', 'park', 'health', 'trek', 'mars', 'veges', 'technology', 'solar system']

  const dispatch = useDispatch()

  const fetchLatestBlog = async () => {
    try {
      await dispatch(getLatestBlogs({ toast }));
      let { blog } = store.getState();

      if (blog?.latestBlogs) setBlogs(() => blog?.latestBlogs)
    } catch (error) {
      console.error('Error fetching latest blogs:', error);
    }
  };

  const fetchTrendingBlogs = async () => {
    try {
      await dispatch(getTrendingBlogs({ toast }));
      let { blog } = store.getState();

      if (blog?.trendingBlogs) setTrendingBlogs(() => blog?.trendingBlogs)
    } catch (error) {
      console.error('Error fetching latest blogs:', error);
    }
  }

  const fetchBlogsByCategory = async () => {
    try {
      await dispatch(getSearchBlogsByCategory({ tag:pageState }));
      let { blog } = store.getState();

      if (blog?.searchBlogs) setBlogs(() => blog?.searchBlogs)
    } catch (error) {
      console.error('Error fetching latest blogs:', error);
    }
  }

  const loadBlogBtCategory = (e, category) => {
    let btn = category.toLowerCase()
    setBlogs(null)
    if (pageState == category) {
      setPageState('home');
      return
    }
    setPageState(category)
  }

  useEffect(() => {
    activeTabRef.current.click()
    if (pageState == 'home') fetchLatestBlog();
    else {
      fetchBlogsByCategory()
    }
    if (!trendingBlogs) fetchTrendingBlogs()

  }, [pageState]);


  return (
    <AnimationWrapper>
      <section className='h-cover flex justify-center gap-10 my-5 px-[4vw]'>
        <div className='w-full'>
          <InPageNavigation routes={[pageState, 'trending blogs']} defaultHidden={['trending blogs']}>

            <>
              {/* latest blogs */}
              {
                blogs === null ? <Loader /> :
                  blogs?.map((blog, i) => {
                    return <AnimationWrapper transition={{ duration: 1, delay: i * .1 }} key={i}>
                      <BlogPostCard content={blog} author={blog?.author?.personal_info} />
                    </AnimationWrapper>
                  })
              }
            </>

            {/* trending blogs */}
            {
              trendingBlogs === null ? <Loader /> :
                trendingBlogs?.map((blog, i) => {
                  return <AnimationWrapper transition={{ duration: 1, delay: i * .1 }} key={i}>
                    <MinimalBlogPost blog={blog} index={i} />
                  </AnimationWrapper>

                })
            }

          </InPageNavigation>
        </div>

        {/* for filter and trending blogs */}
        <div className='min-w-[40%] lg:min-w-[400px] max-w-min border-l border-gray-100 pl-8 pt-3 max-md:hidden'>
          <div className='flex flex-col gap-10'>
            <div>
              <h1 className='font-medium text-xl mb-8'>Stories from all interests</h1>
              <div className='flex gap-3 flex-wrap'>
                {
                  categories?.map((category, i) => {
                    return (
                      <button className={`tag ${pageState == category ? 'bg-black text-white' : ''}`} key={i} onClick={(e) => loadBlogBtCategory(e, category)}>{category}</button>
                    )
                  })
                }
              </div>
            </div>

            <div className=''>
              <h1 className='font-medium text-xl mb-8'>Trending <i className="fi fi-rr-arrow-trend-up"></i></h1>
              {/* trending blogs */}
              {
                trendingBlogs === null ? <Loader /> :
                  trendingBlogs?.map((blog, i) => {
                    return <AnimationWrapper transition={{ duration: 1, delay: i * .1 }} key={i}>
                      <MinimalBlogPost blog={blog} index={i} />
                    </AnimationWrapper>

                  })
              }
            </div>
          </div>
        </div>
      </section>
    </AnimationWrapper>
  )
}

export default HomePage
