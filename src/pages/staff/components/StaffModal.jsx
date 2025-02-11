import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker, Radio, Tabs, Descriptions, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import ImageUpload from '@/components/ImageUpload';
import dayjs from 'dayjs';

const { Option } = Select;

// 部门数据
const DEPARTMENTS = [
    { id: 1, name: '总裁办' },
    { id: 2, name: '技术部' },
    { id: 3, name: '产品部' },
    { id: 4, name: '运营部' },
    { id: 21, name: '人力资源部' },
    { id: 22, name: '财务部' },
    { id: 23, name: '后端开发组', parentId: 2 },
    { id: 24, name: '前端开发组', parentId: 2 },
    { id: 25, name: '移动开发组', parentId: 2 },
    { id: 26, name: '测试组', parentId: 2 }
];

// 职级数据
const LEVELS = [
    { id: 1, name: 'T1-1', description: '初级工程师' },
    { id: 2, name: 'T1-2', description: '中级工程师' },
    { id: 3, name: 'T2-1', description: '高级工程师' },
    { id: 4, name: 'T2-2', description: '资深工程师' },
    { id: 5, name: 'T3-1', description: '技术专家' },
    { id: 6, name: 'T3-2', description: '高级技术专家' }
];

const StaffModal = ({
                        visible,
                        loading,
                        initialValues,
                        onOk,
                        onCancel
                    }) => {
    const [form] = Form.useForm();
    const isEdit = !!initialValues;
    const [editing, setEditing] = React.useState(!isEdit);
    const imageUploadRef = React.useRef();


    useEffect(() => {
        if (visible && initialValues) {
            form.setFieldsValue({
                ...initialValues,
                birthday: initialValues.birthday ? dayjs(initialValues.birthday) : undefined,
                joinDate: initialValues.joinDate ? dayjs(initialValues.joinDate) : undefined,
                level: LEVELS.find(l => l.name === initialValues.level?.levelName)?.id,
                department: initialValues.department?.id,
                avatar: initialValues.avatar
            });
        } else {
            form.resetFields();
        }
    }, [visible, initialValues, form]);

    const handleOk = async () => {
        try {
            const values = await form.validateFields();

            // 如果是新增员工且有选择头像
            if (!isEdit && imageUploadRef.current) {
                const tempFile = imageUploadRef.current.getTempFile();
                if (tempFile) {
                    // 将临时文件添加到表单数据中
                    values.avatarFile = tempFile;
                }
            }

            const submitData = {
                ...values,
                level: values.level,
                department: values.department,
            };
            onOk?.(submitData);
        } catch (error) {
            console.error('表单验证失败:', error);
        }
    };
    // 基本信息展示组件
    const BasicInfoView = () => (
        <Descriptions bordered column={2}>
            <Descriptions.Item label="姓名">{initialValues?.name}</Descriptions.Item>
            <Descriptions.Item label="用户名">{initialValues?.userName}</Descriptions.Item>
            <Descriptions.Item label="部门">{initialValues?.department?.departmentName}</Descriptions.Item>
            <Descriptions.Item label="职级">
                {`${initialValues?.level?.levelName} (${initialValues?.level?.levelDescription})`}
            </Descriptions.Item>
            <Descriptions.Item label="学历">{initialValues?.education}</Descriptions.Item>
            <Descriptions.Item label="性别">{initialValues?.sex}</Descriptions.Item>
            <Descriptions.Item label="手机号">{initialValues?.mobile}</Descriptions.Item>
            <Descriptions.Item label="身份证号">{initialValues?.idNumber}</Descriptions.Item>
            <Descriptions.Item label="生日">
                {initialValues?.birthday && dayjs(initialValues.birthday).format('YYYY-MM-DD')}
            </Descriptions.Item>
            <Descriptions.Item label="入职日期">
                {initialValues?.joinDate && dayjs(initialValues.joinDate).format('YYYY-MM-DD')}
            </Descriptions.Item>
        </Descriptions>
    );

    // 基本信息编辑表单
    const BasicInfoEdit = () => (
        <Form
            form={form}
            layout="vertical"
            tooltip="支持 jpg/png 格式，大小不超过 2MB"
        >
            <Form.Item
                label="头像"
                name="avatar"
                tooltip="支持 jpg/png 格式，大小不超过 2MB"
            >
                <ImageUpload
                    ref={imageUploadRef}
                    employeeId={initialValues?.id}
                />
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
                    {DEPARTMENTS.map(dept => (
                        <Option key={dept.id} value={dept.id}>
                            {dept.parentId ? `${DEPARTMENTS.find(d => d.id === dept.parentId)?.name} - ` : ''}{dept.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                label="职级"
                name="level"
                rules={[{ required: true, message: '请选择职级' }]}
            >
                <Select placeholder="请选择职级">
                    {LEVELS.map(level => (
                        <Option key={level.id} value={level.id}>
                            {level.name} - {level.description}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                label="学历"
                name="education"
                rules={[{ required: true, message: '请选择学历' }]}
            >
                <Select placeholder="请选择学历">
                    <Option value="小学">小学</Option>
                    <Option value="初中">初中</Option>
                    <Option value="高中">高中</Option>
                    <Option value="大专">大专</Option>
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

            <Form.Item
                label="身份证号"
                name="idNumber"
                rules={[
                    { required: true, message: '请输入身份证号' },
                    { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份证号' }
                ]}
            >
                <Input placeholder="请输入身份证号" />
            </Form.Item>

            <Form.Item label="入职日期" name="joinDate">
                <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item label="生日" name="birthday">
                <DatePicker style={{ width: '100%' }} />
            </Form.Item>
        </Form>
    );

    const items = [
        {
            key: 'basic',
            label: '基本信息',
            children: editing ? <BasicInfoEdit /> : <BasicInfoView />
        }
    ];

    return (
        <Modal
            title={isEdit ? '员工信息' : '新增员工'}
            open={visible}
            onCancel={onCancel}
            width={800}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    取消
                </Button>,
                isEdit && !editing && (
                    <Button
                        key="edit"
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => setEditing(true)}
                    >
                        编辑
                    </Button>
                ),
                editing && (
                    <Button
                        key="submit"
                        type="primary"
                        loading={loading}
                        onClick={handleOk}
                    >
                        确定
                    </Button>
                )
            ]}
        >
            <Tabs
                activeKey="basic"
                items={items}
            />
        </Modal>
    );
};

export default StaffModal;
