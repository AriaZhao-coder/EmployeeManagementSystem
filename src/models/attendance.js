import { useState, useCallback } from 'react';
import { attendanceList } from "../api";

// 添加延迟函数
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
export default function useAttendance() {
    const [loading, setLoading] = useState(false);
    const [tableList, setTableList] = useState([]);
    const [chartList, setChartList] = useState([]);

    // 获取仪表板数据
    const fetchAttendanceData = useCallback(async () => {
        setLoading(true);
        try {
            await delay(1000);
            const response = await attendanceList();
            if (response.code === 0) {
                const {
                    lateBI,
                    lateTableList,
                    earlyBI,
                    earlyTableList
                } = response.data;
                //迟到早退表
                setTableList([
                    {title: '迟到详情', renderList:lateTableList, styleData: { width: '49.8%', height: '350px' }},
                    {title: '早退详情', renderList:earlyTableList, styleData: { width: '49.8%', height: '350px'}},
                ])
                //条形图
                setChartList([
                    {title: '迟到员工数量', renderList:lateBI, styleData: { width: '49.8%', height: '350px' }},
                    {title: '早退员工数量', renderList:earlyBI, styleData: { width: '49.8%', height: '350px'}},
                ])
            } else {
                console.error('获取数据失败:', response.msg);
            }
        } catch (error) {
            console.error('获取数据失败：', error);
        } finally {
            setLoading(false);
        }
    },[]);

    return {
        loading,
        tableList,
        chartList,
        fetchAttendanceData,
    }
}
