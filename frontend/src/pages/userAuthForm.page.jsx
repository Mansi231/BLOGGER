import React from 'react'
import InputBox from '../components/input.component'
import google from '../imgs/google.png'
import { Link } from 'react-router-dom'
import { ROUTES } from '../services/routes'
import AnimationWrapper from '../components/page_animation'

const UserAuthForm = ({ type }) => {
    return (
        <AnimationWrapper keyValue={type}>
            <section className='h-cover flex items-center justify-center'>
                <form className='max-w-[400px] w-[80%] flex  justify-center items-center flex-col'>

                    <h1 className='text-4xl capitalize font-gelasio mb-16'>{type == 'sign-in' ? 'Welcom back' : 'join us today'}</h1>

                    {type != 'sign-in' ? <InputBox type={'text'} placeholder={'Full Name'} name={'fullname'} icon={'fi fi-rr-user'} /> : ''}
                    <InputBox type={'email'} placeholder={'Email'} name={'email'} icon={'fi fi-rr-envelope'} />
                    <InputBox type={'password'} placeholder={'Password'} name={'password'} icon={'fi fi-rr-key'} />
                    <button className='btn-dark center mt-10 w-[50%]' type='submit'>{type.replace('-', ' ')}</button>

                    <div className='relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold'>
                        <hr className='w-1/2 border-black' />
                        <p>or</p>
                        <hr className='w-1/2 border-black' />
                    </div>

                    <button className='btn-dark items-center flex gap-3 w-[90%] justify-center center'>
                        <img src={google} alt="google" className='w-7 h-7 rounded-full' />
                        continue with google
                    </button>
                    {
                        type == 'sign-in' ?
                            <p className='mt-8 text-gray-400 text-center text-sm'>
                                Don't have an account ?
                                <Link to={ROUTES.SIGN_UP} className='underline text-sm text-black ml-1'>
                                    Join us today
                                </Link>
                            </p> :
                            <p className='mt-8 text-gray-400 text-center text-sm'>
                                Already a member ?
                                <Link to={ROUTES.SIGN_IN} className='underline text-sm text-black ml-1 cursor-pointer'>
                                    Sign in here.
                                </Link>
                            </p>
                    }
                </form>
            </section>
        </AnimationWrapper>
    )
}

export default UserAuthForm
