import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { sendCode, forgetPassword } from '@/api';
import IconMap from 'components/IconMap';
import './css/login.less';

const ForgetPassword = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(true);
    const [buttonText, setButtonText] = useState('发送验证码');
    const [currentTime, setCurrentTime] = useState(60);
    const [timer, setTimer] = useState(null);

    const onFinish = async (values) => {
        try {
            const res = await forgetPassword(values);
            if (res.code === 200) {
                message.success('密码重置成功');
                navigate('/users/login');
            } else{
                    form.setFields([
                        {
                            name: 'code',
                            validating: false,
                            errors: [res.message || '验证码错误']
                        }
                    ]);
                }
        } catch (error) {
            message.error(error.message || '重置失败');
        }
    };

    const sendSmsCode = async () => {
        if (disabled) return;
        try {
            const mobile = form.getFieldValue('mobile');
            const res = await sendCode({
                mobile,
                type: 3
            });
            if (res.code === 200) {
                startCountDown();
            }
        } catch (error) {
            message.error(error.message || '发送失败');
        }
    };

    const startCountDown = () => {
        setDisabled(true);
        if (timer) clearInterval(timer);

        setCurrentTime(60);
        setButtonText('60秒后重试');

        const newTimer = setInterval(() => {
            setCurrentTime((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(newTimer);
                    setButtonText('发送验证码');
                    setDisabled(false);
                    return 60;
                }
                const nextTime = prevTime - 1;
                setButtonText(`${nextTime}秒后重试`);
                return nextTime;
            });
        }, 1000);
        setTimer(newTimer);
    };

    useEffect(() => {
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [timer]);

    const checkMobile = (e) => {
        const mobile = e.target.value;
        const mobileReg = /^1[3-9]\d{9}$/;
        setDisabled(!mobileReg.test(mobile));
    };

    return (
        <div className="form">
            <h2 style={{textAlign: 'center', marginBottom: '24px'}}>重置密码</h2>
            <Form form={form} onFinish={onFinish}>
                <Form.Item name="mobile" rules={[
                    {required: true, message: '请输入手机号'},
                    {pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确'}
                ]}>
                    <Input
                        placeholder="请输入手机号"
                        prefix={IconMap.mobileIcon}
                        onChange={checkMobile}
                    />
                </Form.Item>

                <Form.Item name="code" rules={[
                    {required: true, message: '请输入验证码'},
                    {len: 6, message: '验证码长度为6位'}
                ]}>
                    <div style={{display: 'flex'}}>
                        <Input
                            placeholder="请输入验证码"
                            prefix={IconMap.codeIcon}
                        />
                        <Button
                            style={{width: '120px', marginLeft: '10px'}}
                            disabled={disabled}
                            onClick={sendSmsCode}
                        >
                            {buttonText}
                        </Button>
                    </div>
                </Form.Item>

                <Form.Item name="new_password" rules={[
                    {required: true, message: '请输入新密码'},
                    {pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/,
                        message: '密码必须包含大小写字母和数字，长度8-20位'}
                ]}>
                    <Input.Password
                        placeholder="请输入新密码"
                        prefix={IconMap.passwordIcon}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        确认重置
                    </Button>
                </Form.Item>

                <div style={{textAlign: 'right'}}>
                    <a onClick={() => navigate('/users/login')}>返回登录</a>
                </div>
            </Form>
        </div>
    );
};

export default ForgetPassword;
