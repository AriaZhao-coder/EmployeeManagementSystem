import request from '../utils/request';

export const analyzeStaff = () => {
    return request({
        url: '/admin/analyze_staff',
        method: 'get'
    });
};
