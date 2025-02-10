import React from 'react';
import { Card, Form, Input, Select, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

const StaffFilter = ({
                         loading,
                         onSearch,
                         onReset
                     }) => {
    const [form] = Form.useForm();

    const handleSearch = async () => {
        const values = await form.validateFields();
        onSearch?.(values);
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
                        <Option value={1}>研发部</Option>
                        <Option value={2}>测试部</Option>
                        <Option value={3}>产品部</Option>
                    </Select>
                </Form.Item>

                <Form.Item name="education" label="学历">
                    <Select
                        placeholder="请选择学历"
                        style={{ width: 200 }}
                        allowClear
                    >
                        <Option value="无学历">无学历</Option>
                        <Option value="高中">高中</Option>
                        <Option value="专科">专科</Option>
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
