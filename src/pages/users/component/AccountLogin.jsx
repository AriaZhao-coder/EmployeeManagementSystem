import React from 'react';
import IconMap from "components/IconMap";


function AccountLogin({Input,FromItem}) {
    return (
        <>
            <FromItem name="username" rules={[
                {
                    required: true,
                    message: '账号名不能为空!',
                },
                {
                    max: 10, message: '账号长度不正确',
                },
                {
                    min: 4, message:'账号长度不正确',
                }
            ]}  hasFeedback
            >
                <Input placeholder="请输入用户名" prefix={IconMap.lock}></Input>
            </FromItem>
            <FromItem name="password" rules={[
                {
                    required: true,
                    message: '密码不能为空!',
                },
                {
                    max: 10, message: '密码长度不正确',
                },
                {
                    min: 4, message:'密码长度不正确',
                }
            ]} hasFeedback>
                <Input type="password" placeholder="请输入密码" prefix={IconMap.passwordIcon}/>
            </FromItem>
        </>
    );
}

export default AccountLogin;
