import React, { useState } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { useLocation } from 'umi';
import { useNavigate } from 'react-router-dom';
import AccountLogin from '@/pages/users/components/AccountLogin';
import SmCodeLogin from '@/pages/users/components/SmCodeLogin';
import IconMap from 'components/IconMap';
import './css/Login.less'
import logoImg from '../../assets/img/logo.jpg';
import storage from '../../utils/storage';
import { login } from '../../api';
import { message } from 'antd';

const FromItem = Form.Item;
const LoginPage = () => {
    const location = useLocation();
    const [form] = Form.useForm();
    const [type, setType] = useState(0);  // 控制登录方式的状态
    const navigate = useNavigate();

    // 提交表单数据
    const submitUserInfo = async (values) => {
        try {
            const loginData = {
                type,
                ...(type === 0
                        ? { user_name: values.username, password: values.password }
                        : { mobile: values.mobile, code: values.code }
                )
            };
            const res = await login(loginData);

            if (res.code === 200) {
                storage.set('token', res.data.token);
                storage.set('userInfo', {
                    user_id: res.data.user_id,
                    user_name: res.data.user_name,
                    role: res.data.role,
                });
                const from = location.state?.from || '/dashboard';
                navigate(from);
            } else {
                // 根据登录类型设置不同的错误提示字段
                if (type === 0) {
                    form.setFields([
                        {
                            name: 'password',
                            validating: false,
                            errors: [res.message || '账号或密码错误']
                        }
                    ]);
                } else {
                    form.setFields([
                        {
                            name: 'code',
                            validating: false,
                            errors: [res.message || '验证码错误']
                        }
                    ]);
                }
            }
        } catch (error) {
            message.error('网络错误，请稍后重试');
        }
    };

    // 根据登录方式渲染不同的组件
    const ComponentSelector = props => !type
        ? <AccountLogin {...props} />
        : <SmCodeLogin {...props} />;


    return (
        <div className="form">
            <div className="logo">
                <img src={ logoImg } alt="" />
                <span>人事管理系统</span>
            </div>
            <Form
                form={form}
                onFinish={submitUserInfo}
            >
                {/* 渲染动态组件 */}
                {ComponentSelector({form, FromItem, Input})}
                <Row>
                    <Button block={true} type="primary" htmlType="submit">登录</Button>
                </Row>
                <Row>
                    <Button block onClick={() => navigate('/users/register')}>
                        注册账号
                    </Button>
                </Row>
                <Row className="ft-12">
                    <Col span={6} onClick={() => navigate('/users/forgetPassword')}>
                        忘记密码？
                    </Col>
                    <Col span={18} className="align-right" onClick={() => setType(!type? 1 : 0)}>
                        {
                            !type ? '使用手机号码进行登录' : '使用账户名进行登录'
                        }
                        {IconMap.arrRowRight}
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default LoginPage;
