import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/userAuth.context'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '../services/routes'
import { getFromSession } from '../common/session'
import { KEYS } from '../services/key'

const Protected = ({ Component }) => {

    const {userAuthDetail :{ access_token}} = useContext(UserContext)
    const {pathname} = useLocation()
    const navigate = useNavigate()

    useEffect(()=>{
        switch (pathname) {
            case (ROUTES.SIGN_IN):
                access_token == null ? navigate(ROUTES.SIGN_IN) : navigate(ROUTES.HOME)
                break;
            case (ROUTES.SIGN_UP):
                access_token == null ? navigate(ROUTES.SIGN_UP) : navigate(ROUTES.HOME)
                break;
            case (ROUTES.EDITOR):
                access_token == null ? navigate(ROUTES.SIGN_IN) : navigate(ROUTES.EDITOR)
                break;
        
            default:
                break;
        }
    },[pathname,access_token])

    return (
        <>
            {Component}
        </>
    )
}

export default Protected
