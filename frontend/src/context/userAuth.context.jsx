import React, { createContext, useEffect, useState } from 'react'
import { getFromSession } from '../common/session'
import { KEYS } from '../services/key'

export const UserContext = createContext()

const UserAuthContext = ({children}) => {

    const [userAuthDetail,setUserAuthDetail] = useState({})

    useEffect(()=>{
        let userSession = getFromSession(KEYS.USER);
        userSession ? setUserAuthDetail(JSON.parse(userSession)) : setUserAuthDetail({access_token:null})
    },[])


  return (
    <UserContext.Provider value={{userAuthDetail,setUserAuthDetail}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserAuthContext
