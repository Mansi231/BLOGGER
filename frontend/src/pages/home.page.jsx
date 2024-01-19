import React from 'react'
import AnimationWrapper from '../common/page_animation'
import InPageNavigation from '../components/inpage-navigation.component'

const HomePage = () => {
  return (
    <AnimationWrapper>
        <section className='h-cover flex justify-center gap-10 my-5 px-[4vw]'>
            {/* latest blogs */}
            <div className='w-full'>
                <InPageNavigation routes={['home','trending blogs']} defaultHidden={['trending blogs']}>
                    <h1>Latest Blogs</h1>
                    <h1>Trending Blogs</h1>
                </InPageNavigation>
            </div>

            {/* for filter and trending blogs */}
            <div></div>

        </section>
    </AnimationWrapper>
  )
}

export default HomePage
