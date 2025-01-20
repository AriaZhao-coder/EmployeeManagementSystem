import React, { useState } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import AccountLogin from './component/AccountLogin';
import SmCodeLogin from './component/SmCodeLogin';
import IconMap from '../../components/IconMap';
import './css/login.css'
import logoImg from '../../assets/img/logo.jpg';


const FromItem = Form.Item;
const LoginPage = () => {
    const [form] = Form.useForm();
    const [type, setType] = useState(0);  // 控制登录方式的状态

    // 提交表单数据
    const submitUserInfo = (data) => {
        console.log(data);  // 在此处理提交的数据
    };

    // 根据登录方式渲染不同的组件
    const ComponentSelector = props => type
        ? <AccountLogin {...props} />
        : <SmCodeLogin {...props} />;


    return (
        <div className="form">
            <div className="logo">
                <img src={ logoImg } alt="" />  {/* 替换为你的logo路径 */}
                <span>织信人事管理系统</span>
            </div>
            <Form form={form} onFinish={submitUserInfo}>
                {/* 渲染动态组件 */}
                {ComponentSelector({form, FromItem, Input})}
                <Row>
                    <Col span={6}>
                        忘记密码？
                    </Col>
                    <Col span={18}>
                        {
                            type ? '使用手机号码进行登录' : '使用账户名进行登录'
                        }
                        {IconMap.arrRowRight}
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default LoginPage;
