import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getSearchBlogsByCategory, getUserProfile } from '../redux/slices/blogSlice'
import { store } from '../redux/store/store'
import AnimationWrapper from '../common/page_animation'
import Loader from '../components/loader.component'
import { UserContext } from '../context/userAuth.context'
import AboutUser from '../components/about.component'
import { filterPaginationData } from '../common/filter-pagination-data'
import InPageNavigation from '../components/inpage-navigation.component'
import BlogPostCard from '../components/blog-post.component'
import NoDataMessage from '../components/nodata.component'
import LoadMoreDataBtn from '../components/load-more.component'
import PageNotFound from './404.page'

export const profileDataStructure = {
  personal_info: {
    fullname: '', username: '', profile_img: '', bio: "'"
  },
  account_info: {
    total_posts: 0, total_reads: 0,
  },
  social_links: {},
  joinedAt: '',
}

const ProfilePage = () => {

  let { id: profileId } = useParams()
  const { userAuthDetail: { username } } = useContext(UserContext);
  const dispatch = useDispatch()

  const [profile, setProfile] = useState(profileDataStructure)
  const [loading, setLoading] = useState(true)
  const [blogs, setBlogs] = useState(null)
  const [profileLoaded,setProfileLoaded] = useState('')

  let { personal_info: { fullname, username: profile_username, profile_img, bio }, account_info: { total_posts, total_reads }, social_links, joinedAt } = profile

  const fetchUserProfile = async () => {
    try {
      await dispatch(getUserProfile({ username: profileId }))
      let { blog: { userProfile } } = store.getState()

      if(userProfile != null)setProfile(userProfile)
      setProfileLoaded(profileId)
      getBlogs({ user_id: userProfile?._id })
      
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error('Error fetching user profile :', error);
    }
  }

  const getBlogs = async ({ page = 1, user_id }) => {

    user_id = user_id === undefined ?  profile?._id : user_id

    try {
      await dispatch(getSearchBlogsByCategory({ author: user_id, page }));
      let { blog } = store.getState();
      
      let formatedData = await filterPaginationData({ state: blogs, page, ...blog?.searchBlogs })
      

      if (blog?.searchBlogs?.data) setBlogs(() => formatedData)
    } catch (error) {
      console.error('Error fetching latest blogs:', error);
    }

  }

  useEffect(() => {
    if(profileId != profileLoaded)setBlogs(null)
    if(blogs == null){
      resetState()
      fetchUserProfile()
    }
  }, [profileId,blogs])

  const resetState = () => { setProfile(profileDataStructure); setLoading(true) ;setBlogs(null);setProfileLoaded('')}

  return (
    <AnimationWrapper>
      {loading ? <Loader /> :
      profile_username?.length ?
        <section className='h-cover md:flex flex-row-reverse items-start gap-5 min-[1100px]:gap-12 p-3'>
          <div className='flex flex-col max-md:items-center gap-5 min-w-[250px] md:w-[50%] md:pl-8 md:border-l border-gray-100 md:sticky md:top-[100px] md:py-10'>
            <img src={profile_img} alt="" className='w-48 h-48 bg-gray-100 rounded-full md:w-32 md:h-32' />
            <h1 className='text-xl  font-medium'>@ {profile_username}</h1>
            <p className='text-lg text-gray-500 capitalize h-5'>{fullname}</p>
            <p className=''>{total_posts.toLocaleString()} Blogs - {total_reads.toLocaleString()} Reads</p>

            <div className='flex gap-4 mt-2'>
              {
                profileId == username && <Link to={'/settings/edit-profile'} className='btn-light rounded-md'>Edit Profile</Link>
              }

            </div>

            <AboutUser className={'max-md:hidden'} bio={bio} social_links={social_links} joinedAt={joinedAt} />
          </div>

          <div className='max-md:mt-12 w-full'>
            <InPageNavigation routes={['Blogs Published', 'About']} defaultHidden={['About']}>

              <>
                {/* latest blogs */}
                {
                  blogs === null ? <Loader /> :
                    blogs?.results?.length ? blogs?.results?.map((blog, i) => {
                      return <AnimationWrapper transition={{ duration: 1, delay: i * .1 }} key={i}>
                        <BlogPostCard content={blog} author={blog?.author?.personal_info} />
                      </AnimationWrapper>
                    }) : <NoDataMessage message={'No blogs published'} />
                }
                <LoadMoreDataBtn state={blogs} fetchDataFun={getBlogs} />
              </>

              {/* trending blogs */}
              <AboutUser bio={bio} social_links={social_links} joinedAt={joinedAt} />

            </InPageNavigation>
          </div>
        </section> : <PageNotFound/>
      }
    </AnimationWrapper>
  )
}

export default ProfilePage
