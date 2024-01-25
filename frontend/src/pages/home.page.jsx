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
import NoDataMessage from '../components/nodata.component'
import LoadMoreDataBtn from '../components/load-more.component'
import { filterPaginationData } from '../common/filter-pagination-data'

const HomePage = () => {

  const [blogs, setBlogs] = useState(null)
  const [trendingBlogs, setTrendingBlogs] = useState(null)
  const [pageState, setPageState] = useState('home')

  let categories = ['space', 'travel', 'park', 'health', 'trek', 'mars', 'veges', 'technology', 'solar system']

  const dispatch = useDispatch()

  const fetchLatestBlog = async ({page=1}) => {
    try {
      await dispatch(getLatestBlogs({ toast ,page}));
      let { blog } = store.getState();
      let formatedData = await filterPaginationData( {state:blogs, page ,...blog?.latestBlogs})      
      if (blog?.latestBlogs?.data) setBlogs(() =>formatedData)
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

  const fetchBlogsByCategory = async ({page=1}) => {
    try {
      await dispatch(getSearchBlogsByCategory({ tag: pageState ,page}));
      let { blog } = store.getState();
      let formatedData = await filterPaginationData( {state:blogs, page ,...blog?.searchBlogs})
      if (blog?.searchBlogs?.data) setBlogs(() => formatedData)
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
    if (pageState == 'home') fetchLatestBlog({page:1});
    else {
      fetchBlogsByCategory({page:1})
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
                blogs?.results === null ? <Loader /> :
                  blogs?.results?.length ? blogs?.results?.map((blog, i) => {
                    return <AnimationWrapper transition={{ duration: 1, delay: i * .1 }} key={i}>
                      <BlogPostCard content={blog} author={blog?.author?.personal_info} />
                    </AnimationWrapper>
                  }) : <NoDataMessage message={'No blogs published'} />
              }
              <LoadMoreDataBtn state={blogs} fetchDataFun={pageState == 'home' ? fetchLatestBlog : fetchBlogsByCategory}/>
            </>

            {/* trending blogs */}
            {
              trendingBlogs === null ? <Loader /> :
                trendingBlogs?.length ?
                  trendingBlogs?.map((blog, i) => {
                    return <AnimationWrapper transition={{ duration: 1, delay: i * .1 }} key={i}>
                      <MinimalBlogPost blog={blog} index={i} />
                    </AnimationWrapper>

                  }) :
                  <NoDataMessage message={'No blogs published'} />
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
                  trendingBlogs?.length ?
                    trendingBlogs?.map((blog, i) => {
                      return <AnimationWrapper transition={{ duration: 1, delay: i * .1 }} key={i}>
                        <MinimalBlogPost blog={blog} index={i} />
                      </AnimationWrapper>

                    }) :
                    <NoDataMessage message={'No blogs published'} />
              }
            </div>
          </div>
        </div>
      </section>
    </AnimationWrapper>
  )
}

export default HomePage
