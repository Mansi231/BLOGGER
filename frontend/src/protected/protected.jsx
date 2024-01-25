import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/userAuth.context';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../services/routes';

const Protected = ({ Component }) => {
  const { userAuthDetail: { access_token } } = useContext(UserContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = access_token !== null;

    if (!isAuthenticated) {
      // If not authenticated, redirect to the login page
      navigate(ROUTES.SIGN_IN);
    } else {
      if(pathname == ROUTES.SIGN_IN || pathname == ROUTES.SIGN_UP) return navigate(ROUTES.HOME)
      // If authenticated, proceed to the requested route
      navigate(pathname);
    }
  }, [pathname, access_token, navigate]);

  return <>{Component}</>;
};

export default Protected;
