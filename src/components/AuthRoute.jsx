import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import storage from '../utils/storage';

const AuthRoute = ({ children }) => {
    const location = useLocation();
    const [authChecked, setAuthChecked] = useState(false);
    const token = storage.get('token');

    const whiteList = ['/users/login', '/users/register', '/users/forgetPassword'];

    useEffect(() => {
        setAuthChecked(true);
    }, []);

    if (!authChecked) {
        return null;
    }

    if (whiteList.includes(location.pathname)) {
        return children;
    }

    if (!token) {
        return <Navigate to="/users/login" state={{ from: location.pathname }} replace />;
    }

    return children;
};

export default AuthRoute;
