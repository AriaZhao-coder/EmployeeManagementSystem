import React from 'react';
import { Outlet } from 'umi';

const LoginLayout = () => {
    return (
        <div>
            <header>
                <h2>Header - Login Layout</h2>
                {/* 登录页面的头部内容，通常可能会有品牌Logo、页面标题等 */}
            </header>
            <main>
                <h3>Login Page Content</h3>
                {/* 渲染登录页面的内容 */}
                <Outlet />
            </main>
            <footer>
                <p>Login Footer Content</p>
                {/* 登录页面的页脚 */}
            </footer>
        </div>
    );
};

export default LoginLayout;
