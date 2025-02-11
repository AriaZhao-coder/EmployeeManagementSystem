import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker, Radio } from 'antd';
import ImageUpload from '@/components/ImageUpload';
import dayjs from 'dayjs';

const { Option } = Select;

const StaffModal = ({
                        visible,
                        loading,
                        initialValues,
                        onOk,
                        onCancel
                    }) => {
    const [form] = Form.useForm();
    const isEdit = !!initialValues;

    useEffect(() => {
        if (visible && initialValues) {
            form.setFieldsValue({
                ...initialValues,
                birthday: initialValues.birthday ? dayjs(initialValues.birthday) : undefined,
                joinDate: initialValues.joinDate ? dayjs(initialValues.joinDate) : undefined,
                level: initialValues.level?.levelName,
                department: initialValues.department?.id
            });
        } else {
            form.resetFields();
        }
    }, [visible, initialValues, form]);

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            const formattedValues = {
                ...values,
                birthday: values.birthday?.format('YYYY-MM-DD'),
                joinDate: values.joinDate?.format('YYYY-MM-DD'),
                department: { id: values.department },
                level: { levelName: values.level }
            };
            onOk?.(formattedValues);
        } catch (error) {
            console.error('表单验证失败:', error);
        }
    };

    return (
        <Modal
            title={isEdit ? '编辑员工' : '新增员工'}
            open={visible}
            onOk={handleOk}
            onCancel={onCancel}
            confirmLoading={loading}
            width={800}
            destroyOnClose
        >
            <Form
                form={form}
                layout="vertical"
            >
                <Form.Item label="头像" name="avatar">
                    <ImageUpload />
                </Form.Item>

                <Form.Item
                    label="姓名"
                    name="name"
                    rules={[{ required: true, message: '请输入姓名' }]}
                >
                    <Input placeholder="请输入姓名" />
                </Form.Item>

                <Form.Item
                    label="用户名"
                    name="userName"
                    rules={[{ required: true, message: '请输入用户名' }]}
                >
                    <Input placeholder="请输入用户名" />
                </Form.Item>

                {!isEdit && (
                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <Input.Password placeholder="请输入密码" />
                    </Form.Item>
                )}

                <Form.Item
                    label="部门"
                    name="department"
                    rules={[{ required: true, message: '请选择部门' }]}
                >
                    <Select placeholder="请选择部门">
                        <Option value={1}>研发部</Option>
                        <Option value={2}>测试部</Option>
                        <Option value={3}>产品部</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="职级"
                    name="level"
                    rules={[{ required: true, message: '请选择职级' }]}
                >
                    <Select placeholder="请选择职级">
                        <Option value="T1-1">T1-1</Option>
                        <Option value="T1-2">T1-2</Option>
                        <Option value="T1-3">T1-3</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="学历"
                    name="education"
                    rules={[{ required: true, message: '请选择学历' }]}
                >
                    <Select placeholder="请选择学历">
                        <Option value="高中">高中</Option>
                        <Option value="专科">专科</Option>
                        <Option value="本科">本科</Option>
                        <Option value="硕士">硕士</Option>
                        <Option value="博士">博士</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="性别"
                    name="sex"
                    rules={[{ required: true, message: '请选择性别' }]}
                >
                    <Radio.Group>
                        <Radio value="男">男</Radio>
                        <Radio value="女">女</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    label="手机号"
                    name="mobile"
                    rules={[
                        { required: true, message: '请输入手机号' },
                        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }
                    ]}
                >
                    <Input placeholder="请输入手机号" />
                </Form.Item>

                <Form.Item label="入职日期" name="joinDate">
                    <DatePicker style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item label="生日" name="birthday">
                    <DatePicker style={{ width: '100%' }} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default StaffModal;
