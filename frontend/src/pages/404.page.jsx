import React from 'react'
import pageNotFound from '../imgs/404.png'
import fullLogo from '../imgs/full-logo.png'
import { Link } from 'react-router-dom'
import { ROUTES } from '../services/routes'

const PageNotFound = () => {
  return (
    <section className='h-cover relative p-10 flex flex-col items-center gap-20 text-center'>
      <img src={pageNotFound} alt="" className='border-2 select-none border-gray-100 w-72 aspect-square object-cover rounded'/>
      <h1 className='text-4xl font-gelasio leading-7'>Page not found</h1>
      <p className='text-gray-400 leading-7 -mt-8 text-xl'>The page you are looking fordoes not exits . Head back to the <Link to={ROUTES.HOME} className='text-black underline'>home page</Link> .</p>
      <div className='mt-auto'>
        <img src={fullLogo} alt="" className='h-8 mx-auto select-none block object-contain'/>
        <p className='mt-5 text-gray-400'>Read millions of stories around the world</p>
      </div>
    </section>
  )
}

export default PageNotFound
