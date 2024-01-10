import React, { useContext, useState } from 'react'
import AnimationWrapper from '../common/page_animation'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/userAuth.context'
import { removeFromSession } from '../common/session'
import { KEYS } from '../services/key'
import { ROUTES } from '../services/routes'
const UserNavigationPanel = () => {

    const {userAuthDetail :{username},setUserAuthDetail} = useContext(UserContext)

    const signOutUser = () =>{
        removeFromSession(KEYS.USER)
        setUserAuthDetail({access_token:null})
    }

    return (
        <AnimationWrapper
            transition={{ duration: 0.2 }}
            className={'absolute right-0 z-50'}
        >
            <div className='bg-white absolute right-0 border border-gray-100 w-52  duration-200'>
                <Link to={ROUTES.EDITOR} className='flex gap-2 link md:hidden py-2 pl-6'>
                    <i className="fi fi-rr-file-edit"></i>
                    <p className='text-sm'>Write</p>
                </Link>
                <Link to={`/user/${username}`} className='link py-2 pl-6'>
                    <p className='text-sm'>Profile</p>
                </Link>
                <Link to={'/dashboard/blogs'} className='link py-2 pl-6'>
                    <p className='text-sm'>Dashboard</p>
                </Link>
                <Link to={'/settings/edit-profile'} className='link py-2 pl-6'>
                    <p className='text-sm'>Settings</p>
                </Link>

                <span className='border-t border-gray-100 absolute w-[100%]'></span>

                <button className='text-left p-4 hover:bg-gray-100 w-full pl-6 py-2' onClick={()=>signOutUser()}>
                    <h1 className='font-bold text-lg mt-1'>Sign Out</h1>
                    <p className='text-gray-300 text-[13px] m-0'>@{username}</p>
                </button>
            </div>
        </AnimationWrapper>
    )
}

export default UserNavigationPanel
