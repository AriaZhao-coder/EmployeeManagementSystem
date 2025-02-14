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

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token && location.pathname !== '/users/login') {
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
