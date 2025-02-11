import React from 'react';
import { Table, Space, Button, Tag, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DeleteConfirm from '@/components/DeleteConfirm';
import ImageUpload from '@/components/ImageUpload';
import dayjs from 'dayjs';

const StaffTable = ({
                        loading,
                        dataSource,
                        onEdit,
                        onDelete,
                        onUpdateAvatar
                    }) => {
    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            width: 120,
        },
        {
            title: '用户名',
            dataIndex: 'userName',
            width: 120,
        },
        {
            title: '身份',
            dataIndex: 'identity',
            width: 100,
            render: (identity) => (
                <Tag color={identity === 1 ? 'blue' : 'green'}>
                    {identity === 1 ? '管理员' : '普通用户'}
                </Tag>
            )
        },
        {
            title: '部门',
            dataIndex: ['department', 'departmentName'],
            width: 150,
        },
        {
            title: '职级',
            dataIndex: ['level', 'levelName'],
            width: 120,
            render: (text, record) => (
                <Tooltip title={record.level?.levelDescription}>
                    <span>{text}</span>
                </Tooltip>
            )
        },
        {
            title: '学历',
            dataIndex: 'education',
            width: 100,
        },
        {
            title: '手机号',
            dataIndex: 'mobile',
            width: 150,
        },
        {
            title: '性别',
            dataIndex: 'sex',
            width: 80,
        },
        {
            title: '入职日期',
            dataIndex: 'joinDate',
            width: 120,
            render: (text) => text ? dayjs(text).format('YYYY-MM-DD') : '-'
        },
        {
            title: '头像',
            dataIndex: 'avatar',
            width: 100,
            render: (text, record) => (
                <ImageUpload
                    value={text}
                    onChange={(url) => onUpdateAvatar?.(record.id, url)}
                />
            )
        },
        {
            title: '操作',
            width: 150,
            fixed: 'right',
            render: (_, record) => (
                <Space>
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => onEdit?.(record)}
                    >
                        查看详情
                    </Button>
                    <DeleteConfirm
                        title="确认删除"
                        content={`确定要删除员工 ${record.name} 吗？删除后将无法恢复！`}
                        onConfirm={() => onDelete?.(record.id)}
                    >
                        <Button type="link" danger icon={<DeleteOutlined />}>
                            删除
                        </Button>
                    </DeleteConfirm>
                </Space>
            )
        }
    ];

    return (
        <Table
            rowKey="id"
            columns={columns}
            dataSource={dataSource}
            loading={loading}
            scroll={{ x: 1500 }}
            pagination={false}
        />
    );
};

export default StaffTable;
