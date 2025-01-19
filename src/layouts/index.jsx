import React from 'react';
import { useLocation } from 'react-router-dom';
import { selectLayout } from 'utils/selectLayout';
import BaseLayout from './BaseLayout';
import LoginLayout from './LoginLayout';

const Layout = ({children}) => {
    const location = useLocation(); // 获取当前路由信息
    const layoutMap = { BaseLayout, LoginLayout };

    const layoutName = selectLayout(location.pathname);

    const Container = layoutMap[layoutName] || BaseLayout;

    return (
        <Container>
            {children}
        </Container>
    );
};

export default Layout;

