import React, { useEffect } from 'react';
import { useModel } from '@umijs/max';
import { Spin } from 'antd';
import StaffAmount from "./component/StaffAmount";
import OldStaffTable from "./component/OldStaffTable";
import Pie from "./component/Pie";
import AgeColumn from "./component/AgeColumn";
import Column from "./component/Column";
import './css/dashboard.css';

const Dashboard = () => {
    const { loading, amountDataList, staffData, pieList, columnList, constellationData, fetchDashboardData} = useModel('dashboard');

    useEffect(() => {
        // 添加一个延迟加载机制
        const initDashboard = async () => {
            await fetchDashboardData();
        };
        initDashboard();
    }, [fetchDashboardData]);

    // 添加数据准备检查
    if (!amountDataList.length || !pieList.length) {
        return <Spin spinning={true} tip="Loading..." />;
    }


    return (
        <Spin spinning={loading} tip="Loading...">
            <div className="dashboard-container">
                {/* 员工数量展示 */}
                {amountDataList.map((item, index) => (
                    <StaffAmount
                        key={index}
                        {...item}
                    />
                ))}

                {/* 饼状图学历情况&员工性别 */}
                {pieList.map((item, index) => (
                    <Pie
                        key={index}
                        {...item}
                    />
                ))}
                {/* 年龄柱状体 */}
                {pieList[1] && < AgeColumn {...pieList[1]} />}

                {/*年龄柱状图*/}
                {columnList.map((item, index) => <Column key={index} {...item} />)}
                {/* 星座分布 */}
                <Pie {...constellationData}/>

                {/* 工龄最老的员工表格 */}
                <OldStaffTable {...staffData} />



            </div>
        </Spin>
    );
};

export default Dashboard;
