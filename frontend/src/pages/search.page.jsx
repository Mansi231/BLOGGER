import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import InPageNavigation from '../components/inpage-navigation.component'
import AnimationWrapper from '../common/page_animation'
import Loader from '../components/loader.component'
import BlogPostCard from '../components/blog-post.component'
import NoDataMessage from '../components/nodata.component'
import LoadMoreDataBtn from '../components/load-more.component'
import { useDispatch } from 'react-redux'
import { getSearchBlogsByCategory, getSearchUsers } from '../redux/slices/blogSlice'
import { filterPaginationData } from '../common/filter-pagination-data'
import { store } from '../redux/store/store'
import UserCard from '../components/usercard.component'

const SearchPage = () => {

    const dispatch = useDispatch()
    let { query } = useParams()
    const [blogs, setBlogs] = useState(null)
    const [users, setUsers] = useState(null)

    const fetchUsers = async () => {
        try {
            await dispatch(getSearchUsers({ query }));
            let { blog } = store.getState();
            if (blog?.users) setUsers(() => blog?.users)
        } catch (error) {
            console.error('Error fetching latest blogs:', error);
        }
    }

    const searchBlogs = async ({ page = 1, create_new_arr = false }) => {
        try {
            await dispatch(getSearchBlogsByCategory({ query, page }));
            let { blog } = store.getState();
            let formatedData = await filterPaginationData({ state: blogs, page, ...blog?.searchBlogs, create_new_arr })
            if (blog?.searchBlogs?.data) setBlogs(() => formatedData)
        } catch (error) {
            console.error('Error fetching latest blogs:', error);
        }
    }

    useEffect(() => {
        resetState()
        searchBlogs({ page: 1, create_new_arr: true })
        fetchUsers()
    }, [query])

    const resetState = () => {
        setBlogs(null)
        setUsers(null)
    }

    const UserCardWrapper = () => {
        return (
            <>
                {
                    users === null ? <Loader /> :
                        users?.length > 0 ?
                            users.map((user,i)=>{
                                return <AnimationWrapper key={i} transition={{duration:1,delay:i*.08}}><UserCard user={user}/></AnimationWrapper>
                            })
                            :
                            <NoDataMessage message={'No user found'} />
                }
            </>
        )
    }

    return (
        <section className='h-cover flex justify-center gap-10 md:px-10 px-3'>
            <div className='w-full'>
                <InPageNavigation routes={[`Search Results from "${query}"`, 'Accounts Matched']} defaultHidden={['Accounts Matched']}>
                    <>
                        {/* latest blogs */}
                        {
                            blogs?.results == null ? <Loader /> :
                                blogs?.results?.length ? blogs?.results?.map((blog, i) => {
                                    return <AnimationWrapper transition={{ duration: 1, delay: i * .1 }} key={i}>
                                        <BlogPostCard content={blog} author={blog?.author?.personal_info} />
                                    </AnimationWrapper>
                                }) : <NoDataMessage message={'No blogs published'} />
                        }
                        <LoadMoreDataBtn state={blogs} fetchDataFun={searchBlogs} />
                    </>

                    <UserCardWrapper />
                </InPageNavigation>
            </div>

            <div className='min-w-[40%] lg:min-w-[350px] max-w-min border-l border-gray-100 pl-8 pt-3 max-md:hidden'>
                <h1 className='font-medium mb-8 text-xl '>User related to search <i className="fi fi-rr-user mt-2 text-lg"></i></h1>
                <UserCardWrapper />
            </div>
        </section>
    )
}

export default SearchPage
