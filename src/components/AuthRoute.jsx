import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import storage from '../utils/storage';

const AuthRoute = ({ children }) => {
    const location = useLocation();
    const token = storage.get('token');

    // 白名单路由 - 不需要登录就能访问的路径
    const whiteList = ['/users/login', '/users/register', '/users/forgetPassword'];

    // 如果当前路径在白名单中，直接渲染
    if (whiteList.includes(location.pathname)) {
        return children;
    }

    // 检查是否有token
    if (!token) {
        // 将用户重定向到登录页面，并携带原目标路径
        return <Navigate to="/users/login" state={{ from: location.pathname }} replace />;
    }

    // 如果有token，正常渲染
    return children;
};

export default AuthRoute;
