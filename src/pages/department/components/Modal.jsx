// src/pages/department/components/DepartmentModal.jsx
import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Table, Divider } from 'antd';

const DepartmentModal = ({
                             visible,
                             type,
                             onCancel,
                             onOk,
                             currentDepartment,
                             departmentList,
                             loading
                         }) => {
    const [form] = Form.useForm();
    const isView = type === 'view';
    const title = isView ? '部门详情' : '新增部门';

    // 当Modal关闭时重置表单
    useEffect(() => {
        if (!visible) {
            form.resetFields();
        }
    }, [visible, form]);

    // 如果是查看模式，设置表单初始值
    useEffect(() => {
        if (isView && currentDepartment) {
            form.setFieldsValue({
                departmentName: currentDepartment.departmentName,
                parentId: currentDepartment.parentId
            });
        }
    }, [isView, currentDepartment, form]);

    // 将部门列表转换为扁平的选项数组，用于选择父部门
    const getDepartmentOptions = (departments, parentPath = '') => {
        let options = [];
        departments.forEach(dept => {
            // 如果是当前部门或其子部门，不应该作为父部门选项
            if (currentDepartment && dept.id === currentDepartment.id) {
                return;
            }
            const currentPath = parentPath ? `${parentPath}/${dept.departmentName}` : dept.departmentName;
            options.push({
                label: currentPath,
                value: dept.id
            });
            if (dept.children) {
                options = [...options, ...getDepartmentOptions(dept.children, currentPath)];
            }
        });
        return options;
    };

    const columns = [
        {
            title: '姓名',
            dataIndex: 'realName',
            key: 'realName',
            width: 100,
        },
        {
            title: '性别',
            dataIndex: 'gender',
            key: 'gender',
            width: 80,
        },
        {
            title: '学历',
            dataIndex: 'education',
            key: 'education',
            width: 100,
        },
        {
            title: '职级',
            dataIndex: 'jobLevel',
            key: 'jobLevel',
            width: 120,
        }
    ];

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            await onOk(values);
            form.resetFields();
        } catch (error) {
            console.error('验证失败:', error);
        }
    };

    return (
        <Modal
            title={title}
            open={visible}
            onCancel={onCancel}
            onOk={isView ? onCancel : handleSubmit}
            okText={isView ? '关闭' : '确定'}
            cancelText="取消"
            confirmLoading={loading}
            width={700}
            destroyOnClose
        >
            <Form
                form={form}
                layout="vertical"
                disabled={isView}
                initialValues={{
                    departmentName: currentDepartment?.departmentName,
                    parentId: currentDepartment?.parentId
                }}
            >
                <Form.Item
                    name="departmentName"
                    label="部门名称"
                    rules={[
                        { required: true, message: '请输入部门名称' },
                        { max: 50, message: '部门名称不能超过50个字符' }
                    ]}
                >
                    <Input placeholder="请输入部门名称" maxLength={50} />
                </Form.Item>

                <Form.Item
                    name="parentId"
                    label="上级部门"
                    extra="不选择则为一级部门"
                >
                    <Select
                        placeholder="请选择上级部门"
                        options={getDepartmentOptions(departmentList)}
                        allowClear
                        showSearch
                        optionFilterProp="label"
                    />
                </Form.Item>
            </Form>

            {isView && currentDepartment && (
                <>
                    <Divider />
                    <div style={{ marginBottom: 16 }}>
            <span style={{ fontSize: 16, fontWeight: 500 }}>
              部门成员 ({currentDepartment.staffCount || 0}人)
            </span>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={currentDepartment.staffList}
                        pagination={false}
                        size="small"
                        scroll={{ y: 240 }}
                        rowKey="id"
                        bordered
                    />
                </>
            )}
        </Modal>
    );
};

export default DepartmentModal;
