import React, { useContext, useState } from 'react'
import logo from '../imgs/logo.png'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { ROUTES } from '../services/routes'
import { UserContext } from '../context/userAuth.context'
import UserNavigationPanel from './user-navigation.component'
const Navbar = () => {

    const [searchBoxVisibility, setSearchBoxVisibility] = useState(false)
    const [userNavPanel, setUserNavPanel] = useState(false)

    const { userAuthDetail, setUserAuthDetail } = useContext(UserContext)
    const navigate = useNavigate()

    const handleUserNavPanel = () =>{
        setUserNavPanel((currentVal)=>!currentVal)
    }

    const handleBlur = () =>{
        setTimeout(()=>{setUserNavPanel((currentVal)=>false)},200)
    }
    const handleSearch = (e) =>{
        let query = e.target.value;
        if(e.keyCode == 13 && query?.length){
            navigate(`/search/${query}`)
        }
        else{
            
        }
    }

    return (
        <>
            <nav className='sticky border-b-2 border-gray-100 z-10 top-0 flex items-center w-full gap-12 px-[4vw] py-4 bg-white m-0'>
                <Link to={'/'} className='h-7 w-16 flex-none'>
                    <img src={logo} className='h-fit w-fit' />
                </Link>

                <div className={`bg-white absolute  w-full left-0 top-full mt-0.5 py-4 px-[5vw] md:border-0 md:inset-0 md:block md:relative md:p-0 md:w-auto md:show ${searchBoxVisibility ? 'show' : 'hide'}`}>
                    <input onKeyDown={handleSearch} type="text" placeholder='search' className='w-full md:w-auto bg-gray-100 p-3 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-gray-300 md:pl-12' />
                    <i className="fi fi-rr-search absolute right-[10%] md:left-5 md:pointer-events-none -translate-y-1/2 top-1/2 text-black text-xl"></i>
                </div>

                <div className='flex items-center gap-3 ml-auto'>
                    <button className='md:hidden bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center' onClick={() => setSearchBoxVisibility((currentVal) => !currentVal)}>
                        <i className="fi fi-rr-search mt-1 text-lg"></i>
                    </button>
                    <Link to={ROUTES.EDITOR} className='hidden md:flex gap-2 link rounded'>
                        <i className="fi fi-rr-file-edit"></i>
                        <p>write</p>
                    </Link>

                    {
                        userAuthDetail?.access_token ?
                            <>
                                <Link to={ROUTES.NOTIFICATION} className='h-fit'>
                                    <button className='w-10 h-10 rounded-full relative bg-gray-100 hover:bg-black/10'>
                                        <i className="fi fi-rr-bell text-lg block mt-1 text-center"></i>
                                    </button>
                                </Link>
                                <div className='relative' onClick={handleUserNavPanel} onBlur={handleBlur}>
                                    <button className='mt-1 w-10 h-10'>
                                        <img src={userAuthDetail?.profile_img} alt="image" className='h-full w-full rounded-full object-cover' />
                                    </button>
                                    {userNavPanel && <UserNavigationPanel />}
                                </div>
                            </> :
                            <>
                                <Link to={ROUTES.SIGN_IN} className='btn-dark'>
                                    Sign In
                                </Link>
                                <Link to={ROUTES.SIGN_UP} className='btn-light hidden md:block'>
                                    Sign Up
                                </Link>
                            </>
                    }
                </div>

            </nav>
            <Outlet />
        </>
    )
}

export default Navbar
