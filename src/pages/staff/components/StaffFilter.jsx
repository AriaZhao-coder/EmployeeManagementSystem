import React from 'react';
import { Card, Form, Input, Select, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

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

const StaffFilter = ({
                         loading,
                         onSearch,
                         onReset
                     }) => {
    const [form] = Form.useForm();

    const handleSearch = async () => {
        try {
            const values = await form.validateFields();
            const queryData = {
                name: values.name ? values.name : undefined,
                department: values.department ? DEPARTMENTS.find(d => d.id === values.department)?.name : undefined,
                education: values.education ? values.education : undefined,
                level: values.level ? LEVELS.find(l => l.id === values.level)?.name : undefined
            };
            onSearch?.(queryData);
        } catch (error) {
            console.error('表单验证失败:', error);
        }
    };

    const handleReset = () => {
        form.resetFields();
        onReset?.();
    };

    return (
        <Card className="mb-4">
            <Form form={form} layout="inline">
                <Form.Item name="name" label="姓名">
                    <Input placeholder="请输入姓名" allowClear />
                </Form.Item>

                <Form.Item name="department" label="部门">
                    <Select
                        placeholder="请选择部门"
                        style={{ width: 200 }}
                        allowClear
                    >
                        {DEPARTMENTS.map(dept => (
                            <Option key={dept.id} value={dept.id}>
                                {dept.parentId ?
                                    `${DEPARTMENTS.find(d => d.id === dept.parentId)?.name} - ${dept.name}` :
                                    dept.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="level" label="职级">
                    <Select
                        placeholder="请选择职级"
                        style={{ width: 200 }}
                        allowClear
                    >
                        {LEVELS.map(level => (
                            <Option key={level.id} value={level.id}>
                                {level.name} - {level.description}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="education" label="学历">
                    <Select
                        placeholder="请选择学历"
                        style={{ width: 200 }}
                        allowClear
                    >
                        <Option value="小学">小学</Option>
                        <Option value="初中">初中</Option>
                        <Option value="高中">高中</Option>
                        <Option value="大专">大专</Option>
                        <Option value="本科">本科</Option>
                        <Option value="硕士">硕士</Option>
                        <Option value="博士">博士</Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Space>
                        <Button
                            type="primary"
                            icon={<SearchOutlined />}
                            onClick={handleSearch}
                            loading={loading}
                        >
                            搜索
                        </Button>
                        <Button onClick={handleReset}>重置</Button>
                    </Space>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default StaffFilter;
