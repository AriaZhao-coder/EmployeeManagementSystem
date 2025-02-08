import request from "../utils/request";

export const attendanceList = () => {
    return request({
        url: '/attendance/attendanceTable',
        method: 'get'
    })
}
