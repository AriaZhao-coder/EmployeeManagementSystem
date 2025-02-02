import request from '../utils/request';

export const login = (data) => {
    return request({
        url: '/user/login',
        method: 'post',
        data
    });
};

export const register = (data) => {
    return request({
        url: '/user/register',
        method: 'post',
        data
    });
};

export const sendCode = (data) => {
    return request({
        url: '/user/send_code',
        method: 'post',
        data
    });
};

export const forgetPassword = (data) => {
    return request({
        url: '/user/forget_password',
        method: 'post',
        data
    });
};

export const getUserInfo = () => {
    return request({
        url: '/user/info',
        method: 'get'
    });
};

export const getRouteList = () => {
    return request({
        url: '/user/get_route_list',
        method: 'get'
    });
};
