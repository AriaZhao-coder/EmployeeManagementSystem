import axios from 'axios';
import storage from './storage';
import { message } from 'antd';

const request = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 5000
});

// 请求拦截器
request.interceptors.request.use(
    (config) => {
        const token = storage.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
request.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        const { response } = error;

        if (response) {
            switch (response.status) {
                case 401:
                    message.error('登录已过期，请重新登录');
                    storage.clear();
                    window.location.href = '/users/login';
                    break;
                case 403:
                    message.error('没有权限访问');
                    break;
                case 404:
                    message.error('请求的资源不存在');
                    break;
                case 500:
                    message.error('服务器错误，请稍后重试');
                    break;
                default:
                    message.error('网络错误，请稍后重试');
            }
        } else {
            message.error('网络错误，请检查您的网络连接');
        }

        return Promise.reject(error);
    }
);

export default request;
