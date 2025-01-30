import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'umi';
import { FrownOutlined } from '@ant-design/icons';

const NotFound = () => {
    const navigate = useNavigate();

    const handleBackHome = () => {
        navigate('/dashboard');
    };

    return (
        <div style={{
            height: 'calc(100vh - 160px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div className="flex flex-col items-center justify-center text-center">
                <FrownOutlined className="text-6xl text-gray-400 mb-6" />

                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    404
                </h1>

                <div className="text-xl text-gray-600 mb-2">
                    抱歉，您访问的页面不存在,请检查输入的网址是否正确，或返回首页继续浏览
                </div>

                <p className="text-gray-500 mb-8">
                </p>

                <Button
                    type="primary"
                    size="large"
                    onClick={handleBackHome}
                >
                    返回首页
                </Button>
            </div>
        </div>
    );
};
export default NotFound;
