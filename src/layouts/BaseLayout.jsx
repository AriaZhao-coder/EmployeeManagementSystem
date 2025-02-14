import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'umi';
import { MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme, Spin } from 'antd';
import IconMap from 'components/IconMap';
import { getRouteList } from "../api";
import logoImg from '../assets/img/logo.jpg';

const { Header, Sider, Content } = Layout;

const BaseLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const [routeList, setRouteList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [layoutReady, setLayoutReady] = useState(false);
    const [initError, setInitError] = useState(null);

    const token = localStorage.getItem('token');
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

    // 初始化路由和权限
    useEffect(() => {
        const initLayout = async () => {
            if (!token) {
                navigate('/users/login');
                return;
            }

            try {
                setLoading(true);
                setInitError(null);
                const res = await getRouteList();

                if (res.code === 0) {
                    const routes = res.data || [];
                    setRouteList(routes);

                    // 处理路由重定向
                    if (location.pathname === '/') {
                        navigate('/dashboard');
                        return;
                    }

                    // 验证路由权限
                    const isValidRoute = routes.some(route =>
                        route.route === location.pathname ||
                        location.pathname === '/users/login' ||
                        location.pathname === '/dashboard'
                    );

                    if (!isValidRoute) {
                        navigate('/404');
                    }
                } else {
                    setInitError(res.message || '获取路由失败');
                }
            } catch (error) {
                console.error('初始化发生错误:', error);
                setInitError('系统初始化失败，请重试');
                navigate('/users/login');
            } finally {
                setLoading(false);
            }
        };

        initLayout();
    }, [token, navigate, location.pathname]);

    // 布局就绪状态
    useEffect(() => {
        if (!loading && routeList.length > 0) {
            const timer = setTimeout(() => {
                setLayoutReady(true);
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [loading, routeList]);

    // 菜单配置
    const menuItems = routeList.map(item => ({
        key: item.route,
        icon: IconMap[item.icon],
        label: item.zhName,
        onClick: () => navigate(item.route)
    }));

    // 登出处理
    const handleLogout = () => {
        // 清理本地存储
        localStorage.removeItem('token');
        // 可以添加其他需要清理的状态
        setRouteList([]);
        setLayoutReady(false);
        navigate('/users/login');
    };

    // 加载状态展示
    if (loading || !layoutReady) {
        return (
            <div className="loading-container" style={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f0f2f5',
                flexDirection: 'column',
                gap: '16px'
            }}>
                <Spin size="large" />
                {initError && (
                    <div style={{ color: '#ff4d4f' }}>{initError}</div>
                )}
            </div>
        );
    }

    return (
        <Layout style={{ minHeight: '100vh',width: '100%'  }}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                width={200}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <div className="logo" style={{
                    height: '64px',
                    margin: '16px',
                    backgroundImage: `url(${logoImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    {!collapsed && (
                        <h1 className="text-white ml-2">人员管理</h1>
                    )}
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[location.pathname]}
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                    style={{ borderRight: 0 }}
                />
            </Sider>
            <Layout
                className="site-layout"
                style={{
                    marginLeft: collapsed ? 80 : 200,
                    height: '100vh',
                    transition: 'margin-left 0.2s',
                    width: `calc(100% - ${collapsed ? 80 : 200}px)`,
                    float: 'right'
                }}
            >
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                        position: 'sticky',
                        top: 0,
                        zIndex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxShadow: '0 1px 4px rgba(0,21,41,.08)',
                        height: '64px',
                        lineHeight: '64px'
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <Button
                        type="text"
                        icon={<LogoutOutlined />}
                        onClick={handleLogout}
                        style={{
                            fontSize: '16px',
                            marginRight: 20
                        }}
                    >
                        退出登录
                    </Button>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        minHeight: 'calc(100vh - 112px)',
                        minWidth: '100%',
                        height: 'auto',
                        flex: 1,
                        overflow: 'auto'
                    }}
                >
                    <Spin spinning={!layoutReady}>
                        {layoutReady && <Outlet />}
                    </Spin>
                </Content>
            </Layout>
        </Layout>
    );
};

export default BaseLayout;
