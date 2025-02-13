// src/api/department.js
import request from '../utils/request';

// 获取部门列表（树形结构）
export const getDepartmentList = () => {
    return request({
        url: '/department/list',
        method: 'get'
    });
};

// 获取部门详情
export const getDepartmentDetail = (id) => {
    return request({
        url: `/department/${id}`,
        method: 'get'
    });
};

// 新增部门
export const addDepartment = (data) => {
    return request({
        url: '/department/add',
        method: 'post',
        data
    });
};

// 删除部门
export const deleteDepartment = (id) => {
    return request({
        url: `/department/delete/${id}`,
        method: 'delete'
    });
};

