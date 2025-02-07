import { useState, useCallback } from 'react';
import { analyzeStaff } from "../api";

export default function useDashboard() {
    const [loading, setLoading] = useState(false);
    const [amountDataList, setAmountDataList] = useState([]);
    const [staffData, setStaffData] = useState({});
    const [pieList, setPieList] = useState([]);
    const [columnList, setColumnList] = useState([]);
    const [constellationData, setConstellationData] = useState({});

    // 获取仪表板数据
    const fetchDashboardData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await analyzeStaff();

            if (response.code === 0) {
                const {
                    total,
                    onboardingTimeData,
                    workingYearsMaps,
                    educationList,
                    genderList,
                    ageMap,
                    departmentDistribution,
                    constellationList
                } = response.data;

                // 更新员工数量统计
                setAmountDataList([
                    {
                        title: '总人数',
                        amount: total,
                        styleData: { width: '100%', height: '170px' },
                    },
                    {
                        title: '入职1年内的员工',
                        amount: onboardingTimeData['1年内'],
                        styleData: { width: '33%', height: '170px' },
                    },
                    {
                        title: '入职1-2年内的员工',
                        amount: onboardingTimeData['1-2年内'],
                        styleData: { width: '33%', height: '170px' },
                    },
                    {
                        title: '入职2年以上员工',
                        amount: onboardingTimeData['2年以上'],
                        styleData: { width: '33%', height: '170px' },
                    }
                ]);


                //学历情况
                setPieList([
                    {title: '学历情况', renderList: educationList, styleData: { width: '49.8%', height: '350px' }},
                    {title: '员工性别占比', renderList: genderList, styleData: { width: '49.8%', height: '350px' }}
                ]);

                //柱状图
                setColumnList([
                    {title: '员工年龄段', renderList: ageMap, styleData: { width: '49.8%', height: '350px' }},
                    {title: '部门员工数量', renderList: departmentDistribution, styleData: { width: '49.8%', height: '350px' }}
                ])
                //星座
                setConstellationData({
                    title: '员工星座分布', renderList: constellationList, styleData: { width: '49.8%', height: '350px' }
                })

                // 更新工龄最老的员工数据
                setStaffData({
                    title: '工龄最老的十个员工',
                    renderList: workingYearsMaps.map(item => ({
                        userName: item.userName,
                        department: item.department || '未分配'
                    }))
                });
            } else {
                console.error('获取数据失败:', response.msg);
            }
        } catch (error) {
            console.error('获取数据失败:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        amountDataList,
        pieList,
        columnList,
        constellationData,
        staffData,
        fetchDashboardData
    };
}
