import React from 'react'
import InputBox from '../components/input.component'

const UserAuthForm = ({ type }) => {
    return (
        <section className='h-cover flex items-center justify-center'>
            <form className='max-w-[400px] w-[80%] flex  justify-center items-center flex-col'>

                <h1 className='text-4xl capitalize font-gelasio mb-24'>{type == 'sign-in' ? 'Welcom back' : 'join us today'}</h1>
                {type != 'sign-in' ? <InputBox /> : ''}
            </form>
        </section>
    )
}

export default UserAuthForm
