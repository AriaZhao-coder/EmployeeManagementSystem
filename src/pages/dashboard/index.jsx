import React, { useEffect } from 'react';
import { useModel } from '@umijs/max';
import { Spin } from 'antd';
import StaffAmount from "./component/StaffAmount";
import OldStaffTable from "./component/OldStaffTable";
import Pie from "./component/Pie";
import './css/dashboard.css';

const Dashboard = () => {
    const { loading, amountDataList, staffData, pieList, columnList, constellationData, fetchDashboardData} = useModel('dashboard');

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

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
                {/* 星座分布 */}
                <Pie {...constellationData}/>

                {/* 工龄最老的员工表格 */}
                <OldStaffTable {...staffData} />



            </div>
        </Spin>
    );
};

export default Dashboard;
