import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'umi';
import { selectLayout } from 'utils/selectLayout';
import BaseLayout from './BaseLayout';
import LoginLayout from './LoginLayout';
import AuthRoute from '../components/AuthRoute';
import { Outlet } from 'umi';

const Layout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [routeReady, setRouteReady] = useState(false);
    const layoutMap = { BaseLayout, LoginLayout };
    const layoutName = selectLayout(location.pathname);
    const Container = layoutMap[layoutName] || BaseLayout;


    //定义白名单路径
    const whiteList = ['/users/login', '/users/register', '/users/forgetPassword'];
    useEffect(() => {
        const token = localStorage.getItem('token');
        // 修改重定向逻辑，增加白名单判断
        if (!token && !whiteList.includes(location.pathname)) {
            navigate('/users/login');
        }
        setRouteReady(true);
    }, [location.pathname, navigate]);

    if (!routeReady) {
        return null;
    }
    return (
        <AuthRoute>
            <Container>
                <Outlet />
            </Container>
        </AuthRoute>
    );
};

export default Layout;
