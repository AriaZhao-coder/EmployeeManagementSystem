import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation} from 'umi';
import IconMap from 'components/IconMap';
import { getRouteList } from "../api";
import { MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import logoImg from '../assets/img/logo.jpg';

const { Header, Sider, Content } = Layout;

const BaseLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const [routeList, setRouteList] = useState([]);
    const token = localStorage.getItem('token');
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
    useEffect(() => {
        if (location.pathname === '/') {
            navigate('/dashboard');
            return;
        }

        if (!token) {
            navigate('/users/login');
            return;
        }

        const fetchRoutes = async () => {
            try {
                const res = await getRouteList();
                if (res.code === 0) {
                    const routes = res.data || [];
                    setRouteList(routes);

                    // 检查当前路径是否存在于路由列表中
                    const isValidRoute = routes.some(route =>
                        route.route === location.pathname ||
                        location.pathname === '/users/login' ||
                        location.pathname === '/dashboard'
                    );

                    // 如果路径不存在且不是特殊路径，重定向到404
                    if (!isValidRoute) {
                        navigate('/404');
                    }
                } else {
                    console.error('获取路由失败', res.msg);
                }
            } catch (error) {
                console.error('获取路由列表发生错误:', error);
                navigate('/users/login');
            }
        };

        fetchRoutes();
    }, [token, navigate]);

    const menuItems = routeList.map(item => ({
        key: item.route,
        icon: IconMap[item.icon],
        label: item.zhName,
        onClick: () => navigate(item.route)
    }));

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/users/login');
    };

    return (
        <Layout style={{ minHeight: '100vh'}}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
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
                    items={menuItems}
                    style={{ borderRight: 0 }}
                />
            </Sider>
            <Layout style={{ marginLeft: collapsed ? '80px' : '200px', transition: 'margin-left 0.2s' }}>
                <Header style={{
                    padding: '0 16px',
                    background: colorBgContainer,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{ fontSize: '16px' }}
                    />
                    <Button
                        type="text"
                        icon={<LogoutOutlined />}
                        onClick={handleLogout}
                        style={{ fontSize: '16px' }}
                    >
                        退出登录
                    </Button>
                </Header>
                <Content style={{
                    margin: '24px 16px',
                    padding: 24,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                    minHeight: 'calc(100vh - 112px)',
                    overflow: 'initial'
                }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};


export default BaseLayout;


