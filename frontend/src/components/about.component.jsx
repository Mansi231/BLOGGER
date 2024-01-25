import React from 'react'
import { Link } from 'react-router-dom'
import { getFullDay } from '../common/date'

const AboutUser = ({ bio, social_links, joinedAt, className }) => {
    return (
        <div className={`md:w-[90%] md:mt-5 ${className}`}>
            <p className='text-lg leading-7 '>{bio?.length ? bio : 'Nothing to read here'}</p>
            <div className='flex gap-x-7 gap-y-2 flex-wrap my-7 items-center text-gray-400'>
                {
                    Object.keys(social_links).map((key, i) => {
                        let link = social_links[key]
                        return (
                            link ?
                                <Link key={i} to={link} target='_blank'>
                                    <i className={`fi ${key == 'website' ? 'fi-rr-globe' : `fi-brands-${key}`} text-2xl hover:text-black`}></i>
                                </Link> : null
                        )
                    })
                }
            </div>
            <p className='text-lg leading-7 text-gray-400 '>Joined on {getFullDay(joinedAt)}</p>
        </div>
    )
}

export default AboutUser
