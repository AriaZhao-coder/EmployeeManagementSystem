import React, { useState, useEffect } from 'react';
import { Button, Input, Form } from 'antd';
import IconMap from 'components/IconMap';

const SmCodeLogin = ({ form }) => {
    const [disabled, setDisabled] = useState(true);
    const [buttonText, setButtonText] = useState('发送验证码');
    const [currentTime, setCurrentTime] = useState(60);
    const [timer, setTimer] = useState(null);

    // 发送验证码
    const _sendSmCode = async () => {
        if (disabled) return;
        setDisabled(true);

        if (timer) {
            clearInterval(timer);
        }

        // 立即更新显示
        setCurrentTime(60);
        setButtonText('60秒后重试');

        // 启动倒计时
        const newTimer = setInterval(() => {
            setCurrentTime((prevTime) => {
                const nextTime = prevTime - 1;
                if (nextTime <= 0) {
                    clearInterval(newTimer);
                    setButtonText('发送验证码');
                    setDisabled(false);
                    return 60;
                } else {
                    // 在这里更新按钮文本，显示当前的倒计时数值
                    setButtonText(`${nextTime}秒后重试`);
                    return nextTime;
                }
            });
        }, 1000);

        setTimer(newTimer);
    };

    // 清理定时器
    useEffect(() => {
        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [timer]);

    // 检查手机号码的有效性
    const checkedMobile = (val) => {
        const mobileReg = /^1[3-9]\d{9}$/;
        if (mobileReg.test(val)) {
            setDisabled(false);
            if (currentTime === 60) {
                setButtonText('发送验证码');
            }
        } else {
            setDisabled(true);
            setButtonText('发送验证码');
        }
    };

    return (
        <>
            <Form.Item
                name="mobile"
                rules={[
                    {
                        validator: (rule, val) => {
                            const mobileReg = /^1[3-9]\d{9}$/;
                            if (!val) return Promise.reject('手机号码不能为空');
                            if (!mobileReg.test(val)) return Promise.reject('手机号码格式不正确');
                            return Promise.resolve();
                        },
                    },
                ]}
                hasFeedback
            >
                <Input
                    placeholder="请输入手机号码"
                    prefix={IconMap.mobileIcon}
                    onChange={(e) => checkedMobile(e.target.value)}
                />
            </Form.Item>

            <Form.Item
                name="code"
                rules={[
                    { required: true, message: '验证码不能为空' },
                    { max: 6, message: '验证码长度不正确' },
                    { min: 6, message: '验证码长度不正确' },
                ]}
                hasFeedback
            >
                <Input.Group compact>
                    <Input
                        style={{ width: 'calc(100% - 120px)' }}
                        placeholder="请输入验证码"
                        prefix={IconMap.codeIcon}
                    />
                    <Button
                        style={{ width: '120px' }}
                        disabled={disabled}
                        onClick={_sendSmCode}
                    >
                        {buttonText}
                    </Button>
                </Input.Group>
            </Form.Item>
        </>
    );
};

export default SmCodeLogin;
