import React, { useState, useEffect } from 'react';
import { Button, Input, Form } from 'antd';
import IconMap from 'components/IconMap';
import { sendCode} from "../../../api";

const SmCodeLogin = ({ form, apiError }) => {
    const [disabled, setDisabled] = useState(true);
    const [buttonText, setButtonText] = useState('发送验证码');
    const [currentTime, setCurrentTime] = useState(60);
    const [timer, setTimer] = useState(null);

    // 发送验证码
    const _sendSmCode = async () => {
        if (disabled) return;
         try {
             const mobile = form.getFieldValue('mobile');
             const res = await sendCode({
                 mobile,
                 type: 2
             });

             if (res.code === 200) {
                 setDisabled(false);
                 if (timer) clearInterval(timer);

                 setCurrentTime(60);
                 setButtonText('60秒重试');

                 const newTimer = setInterval(() => {
                     setCurrentTime((prevTime) => {
                         const nextTime = prevTime - 1;
                         if (nextTime <= 0) {
                             clearInterval(newTimer);
                             setCurrentTime(60);
                             setButtonText('发送验证码');
                             setDisabled(false);
                             return 60;
                         }
                         setButtonText(`${nextTime}秒后重试`)
                         return nextTime;
                     });
                 }, 1000);
                 setTimer(newTimer);
             }
         } catch (error) {
             message.error(error.message || '发送验证码失败');
         }
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
                validateStatus={apiError ? "error" : undefined}
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
                validateStatus={apiError ? "error" : undefined}
                rules={[
                    { required: true, message: '验证码不能为空' },
                    { max: 6, message: '验证码长度不正确' },
                    { min: 6, message: '验证码长度不正确' },
                ]}
                hasFeedback
            >
                <div style={{ display: 'flex' }}>
                    <Input
                        placeholder="请输入验证码"
                        prefix={IconMap.codeIcon}
                    />
                    <Button
                        style={{ width: '120px', marginLeft: '10px' }}
                        disabled={disabled}
                        onClick={_sendSmCode}
                    >
                        {buttonText}
                    </Button>
                </div>
            </Form.Item>
        </>
    );
};

export default SmCodeLogin;
