import React from 'react';
import { Outlet } from 'umi';

const LoginLayout = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default LoginLayout;
