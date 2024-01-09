import React, { useState } from 'react'

const InputBox = ({type,value,placeholder,name,id,icon}) => {

  const [passwordVisible,setPasswordVisible] = useState(false)
  return (
    <div className='relative w-[100%] mb-4'>
      <input id={id} name={name} defaultValue={value} placeholder={placeholder} type={type == 'password' ? passwordVisible ? 'text': 'password' : type} className='input-box'/>
      <i className={`${icon} input-icon`}></i>
      {
        type == 'password' && <i className={`fi ${passwordVisible ? 'fi-rr-eye' :'fi-rr-eye-crossed'} input-icon left-[auto] right-4 cursor-pointer`} onClick={()=>setPasswordVisible((curretVal)=>!curretVal)}></i>
      }
    </div>
  )
}

export default InputBox
