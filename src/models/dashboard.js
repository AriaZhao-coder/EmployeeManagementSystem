import { useState, useCallback } from 'react';

export default function useDashboard() {
    // 添加 loading 状态
    const [loading, setLoading] = useState(false);

    // 定义员工数量统计数据
    const [amountDataList, setAmountDataList] = useState([
        {
            title: '总人数',
            amount: 17,
            styleData: { width: '100%', height: '170px' },
        },
        {
            title: '入职1年内的员工',
            amount: 13,
            styleData: { width: '33%', height: '170px' },
        },
        {
            title: '入职1-2内的员工',
            amount: 0,
            styleData: { width: '33%', height: '170px' },
        },
        {
            title: '入职3年以上员工',
            amount: 4,
            styleData: { width: '33%', height: '170px' },
        }
    ]);

    // 定义工龄最老的员工数据
    const [staffData, setStaffData] = useState({
        title: '工龄最老的十个人',
        renderList: [
            {
                'userName': '小坏蛋',
                'department': '研发部'
            },
            {
                'userName': '管理员',
                'department': ''
            },
            {
                'userName': '陆嘉良',
                'department': '研发部'
            },
            {
                'userName': '马云',
                'department': '运营部'
            },
            {
                'userName': '韩非子',
                'department': '研发部'
            },
            {
                'userName': '安安',
                'department': '客服部'
            },
            {
                'userName': '思思',
                'department': '研发部'
            },
            {
                'userName': '炎炎',
                'department': '研发部'
            },
            {
                'userName': '雪儿',
                'department': '销售部'
            },
            {
                'userName': '小小',
                'department': '运营部'
            }
        ]
    });

    // 模拟获取数据的异步方法
    const fetchDashboardData = useCallback(async () => {
        setLoading(true);  // 开始加载
        try {
            await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟请求延迟
            // const response = await fetch('/api/dashboard');
            // const data = await response.json();
            // setAmountDataList(data.amountDataList);
            // setStaffList(data.staffList);
        } catch (error) {
            console.error('获取数据失败:', error);
        } finally {
            setLoading(false);  // 结束加载
        }
    }, []);
    return {
        loading,
        amountDataList,
        staffData,
        fetchDashboardData
    };
}
