import React from 'react';
import {Table, Tag} from 'antd'

const ViolationTable = ({ title, renderList }) => {
    const columns = [
        {
            title: '姓名',
            dataIndex: 'staffName',
        },
        {
            title: '考勤时间',
            dataIndex: 'createTime',
            render: (text) => {
                const date = new Date(text);
                return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
            }
        },
        {
            title: '考勤类型',
            dataIndex: 'attendanceType',
            render: attendanceType => <Tag color="red">{attendanceType === 4 ? '迟到' : '早退'}</Tag>
        },
        {
            title: '部门',
            dataIndex: 'staffDepartment',
            render: staffDepartment => <Tag color="blue">{staffDepartment  ? staffDepartment : '暂无部门消息'}</Tag>
        }
    ];

    return (
        <div className="block-container">
            <div className="title">{title}</div>
            <Table
                dataSource={renderList}
                rowKey={columns => columns._id}
                columns={columns}
                pagination={false}
            />
        </div>
    );
};

export default ViolationTable;

