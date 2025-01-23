import React from 'react';
import IconMap from "components/IconMap";
import { message } from 'antd';

function AccountLogin({Input, FromItem, apiError}) {
    return (
        <>
            <FromItem
                name="username"
                validateStatus={apiError ? "error" : undefined}
                rules={[
                    {
                        required: true,
                        message: '账号名不能为空!',
                    },
                    {
                        pattern: /^[a-zA-Z0-9_]{4,10}$/,
                        message: '账号只能包含字母、数字和下划线，长度4-10位'
                    }
            ]}  hasFeedback
            >
                <Input placeholder="请输入用户名" prefix={IconMap.lock}></Input>
            </FromItem>
            <FromItem
                name="password"
                validateStatus={apiError ? "error" : undefined}
                rules={[
                    {
                        required: true,
                        message: '密码不能为空!',
                    },
                ]}
                hasFeedback
            >
                <Input type="password" placeholder="请输入密码" prefix={IconMap.passwordIcon}/>
            </FromItem>
        </>
    );
}

export default AccountLogin;
