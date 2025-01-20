import React from 'react';
import { useLocation } from 'umi';
import { selectLayout } from 'utils/selectLayout';
import BaseLayout from './BaseLayout';
import LoginLayout from './LoginLayout';
import { Outlet } from 'umi';  // 引入 Outlet

const Layout = () => {
    const location = useLocation(); // 获取当前路由信息
    const layoutMap = { BaseLayout, LoginLayout };

    const layoutName = selectLayout(location.pathname); // 根据路径选择布局


    const Container = layoutMap[layoutName] || BaseLayout;

    return (
        <Container>
            <Outlet />
        </Container>
    );
};

export default Layout;
