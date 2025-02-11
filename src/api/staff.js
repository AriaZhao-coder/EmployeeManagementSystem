
import request from '../utils/request';

// 获取员工列表
export const getStaffList = (data) => {
    const { page, size, queryData } = data;

    // 处理查询参数，使其符合后端要求
    const processedQueryData = {
        education: queryData.education ? [queryData.education] : [],
        level: queryData.level ? [queryData.level] : [],
        department: queryData.department ? [queryData.department] : [],
        name: queryData.name ? [queryData.name] : []
    };

    return request({
        url: '/staff/info_list',
        method: 'post',
        data: {
            page,
            size,
            queryData: processedQueryData
        }
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
    // 格式化日期为 YYYY-MM-DD
    const formattedData = {
        ...data,
        birthday: data.birthday?.format('YYYY-MM-DD'),
        joinDate: data.joinDate?.format('YYYY-MM-DD'),
        // 确保部门和职级格式正确
        department: {
            id: data.department
        },
        level: {
            id: data.level
        }
    };

    return request({
        url: '/staff/add',
        method: 'post',
        data: formattedData
    });
};

// 修改员工信息
export const updateStaff = (id, data) => {
    // 格式化更新数据
    const formattedData = {
        ...data,
        department: data.department ? {
            id: data.department
        } : undefined,
        level: data.level ? {
            id: data.level
        } : undefined
    };

    return request({
        url: `/staff/update/${id}`,
        method: 'put',
        data: formattedData
    });
};
