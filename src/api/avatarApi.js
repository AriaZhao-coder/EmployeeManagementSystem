import request from '../utils/request';


// 直接上传头像（用于新增员工）
export const uploadAvatar = (formData) => {
    return request({
        url: '/avatar/upload',
        method: 'post',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

// 更新员工头像（需要employeeId，用于编辑员工）
export const updateEmployeeAvatar = (formData, employeeId) => {
    return request({
        url: `/avatar/${employeeId}`,
        method: 'post',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

// 获取完整的图片URL
export const getFullImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const baseUrl = request.defaults.baseURL.replace('/api', '');
    return `${baseUrl}${path}`;
};
