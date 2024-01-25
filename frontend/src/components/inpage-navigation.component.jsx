import React, { useEffect, useRef, useState } from 'react'

export let activeTabLineRef;
export let activeTabRef;

const InPageNavigation = ({ routes, defaultActiveIndex = 0, defaultHidden = [], children }) => {

    const [inPageNavIndex, setInPageNAvIndex] = useState(defaultActiveIndex)
    activeTabLineRef = useRef()
    activeTabRef = useRef()

    const changePageState = (btn, i) => {
        let { offsetWidth, offsetLeft } = btn
        activeTabLineRef.current.style.width = `${offsetWidth}px`
        activeTabLineRef.current.style.left = `${offsetLeft}px`
        setInPageNAvIndex(i)
    }

    useEffect(() => {
        changePageState(activeTabRef.current, defaultActiveIndex)
    }, [])


    return (
        <>
            <div className='relative bg-white border-b border-gray-100 flex-nowrap mb-8 flex overflow-x-auto'>
                {
                    routes?.map((route, i) => {
                        return (
                            <button ref={i == defaultActiveIndex ? activeTabRef : null} key={i} className={`p-4 md:text-lg text-sm px-5 capitalize ${inPageNavIndex == i ? 'text-black' : 'text-gray-400'} ${defaultHidden.includes(route) ? 'md:hidden' : ''}`} onClick={(e) => changePageState(e.target, i)}>{route}</button>
                        )
                    })
                }
                <hr ref={activeTabLineRef} className='absolute bottom-0 duration-300 border-black' />
            </div>

            {Array.isArray(children) ? children[inPageNavIndex] : children}
        </>
    )
}

export default InPageNavigation
