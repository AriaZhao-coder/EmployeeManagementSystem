import React from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const DeleteConfirm = ({ children, title = '确认删除', content = '确定要删除该记录吗？', onConfirm }) => {
    const showConfirm = () => {
        Modal.confirm({
            title,
            icon: <ExclamationCircleOutlined />,
            content,
            okText: '确认',
            cancelText: '取消',
            onOk: onConfirm
        });
    };

    return React.cloneElement(children, {
        onClick: showConfirm
    });
};

export default DeleteConfirm;
