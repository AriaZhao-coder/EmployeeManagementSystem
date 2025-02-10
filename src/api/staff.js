import request from '../utils/request';

// 获取员工列表
export const getStaffList = (data) => {
    return request({
        url: '/staff/info_list',
        method: 'post',
        data
    });
};
// 获取员工详情
export const getStaffDetail = (id) => {
    return request({
        url: `/staff/info/${id}`,
        method: 'post'
    });
};

// 删除员工
export const deleteStaff = (id) => {
    return request({
        url: `/staff/delete/${id}`,
        method: 'delete'
    });
};

// 新增员工
export const addStaff = (data) => {
    return request({
        url: '/staff/add',
        method: 'post',
        data
    });
};

// 修改员工信息
export const updateStaff = (id, data) => {
    return request({
        url: `/staff/update/${id}`,
        method: 'put',
        data
    });
};
