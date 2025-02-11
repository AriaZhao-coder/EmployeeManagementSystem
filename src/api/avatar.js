import request from '../utils/request';

// 上传头像
export const uploadAvatar = (formData, employeeId) => {
    return request({
        url: `/avatar/${employeeId}`,
        method: 'post',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};
