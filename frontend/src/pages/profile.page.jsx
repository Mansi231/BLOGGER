import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getUserProfile } from '../redux/slices/blogSlice'
import { store } from '../redux/store/store'
import AnimationWrapper from '../common/page_animation'
import Loader from '../components/loader.component'

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
  const dispatch = useDispatch()

  const [profile, setProfile] = useState(profileDataStructure)
  const [loading, setLoading] = useState(true)

  let { personal_info: { fullname, username: profile_username, profile_img, bio }, account_info: { total_posts, total_reads }, social_links, joinedAt } = profile

  const fetchUserProfile = async () => {
    try {
      await dispatch(getUserProfile({ username: profileId }))
      let { blog: { userProfile } } = store.getState()
      setProfile(userProfile)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error('Error fetching latest blogs:', error);
    }
  }

  useEffect(() => {
    fetchUserProfile()
  }, [])

  return (
    <AnimationWrapper>
      {loading ? <Loader /> :
        <section className='h-cover md:flex flex-row-reverse items-start gap-5 min-[1100px]:gap-12 p-3'>
          <div className='flex flex-col max-md:items-center gap-5 min-w-[250px]'>
            <img src={profile_img} alt="" className='w-48 h-48 bg-gray-100 rounded-full md:w-32 md:h-32' />
            <h1 className='text-xl md:text-2xl font-medium'>@ {profile_username}</h1>
            <p className='text-lg md:text-xl text-gray-500 capitalize h-5'>{fullname}</p>
            <p className=''>{total_posts.toLocaleString()} Blogs - {total_reads.toLocaleString()} Reads</p>
          </div>
        </section>
      }
    </AnimationWrapper>
  )
}

export default ProfilePage
