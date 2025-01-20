import React from 'react';
import { Outlet } from 'umi';  // 引入 Outlet

const BaseLayout = () => {
    console.log('Rendering BaseLayout');  // 调试信息
    return (
        <div>
            <header>
                <h2>Header - Base Layout</h2>
                {/* 你可以在这里放置导航、Logo 等内容 */}
            </header>
            <aside>
                <h3>Sidebar - Base Layout</h3>
                {/* 这里放置侧边栏内容 */}
            </aside>
            <main>
                <h3>Main Content</h3>
                {/* 渲染嵌套的子路由内容 */}
                <Outlet />
            </main>
            <footer>
                <p>Footer Content</p>
                {/* 这里放置页脚 */}
            </footer>
        </div>
    );
};

export default BaseLayout;


