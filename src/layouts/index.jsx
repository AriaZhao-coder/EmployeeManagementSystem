import React from 'react';
import { useLocation } from 'umi';
import { selectLayout } from 'utils/selectLayout';
import BaseLayout from './BaseLayout';
import LoginLayout from './LoginLayout';
import AuthRoute from '../components/AuthRoute';
import { Outlet } from 'umi';  // 引入 Outlet

const Layout = () => {
    const location = useLocation(); // 获取当前路由信息
    const layoutMap = { BaseLayout, LoginLayout };

    const layoutName = selectLayout(location.pathname); // 根据路径选择布局


    const Container = layoutMap[layoutName] || BaseLayout;

    return (
        <AuthRoute>
            <Container>
                <Outlet />
            </Container>
        </AuthRoute>

    );
};

export default Layout;
