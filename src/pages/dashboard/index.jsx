import React, { useEffect } from 'react';
import { useModel } from '@umijs/max';
import { Spin } from 'antd';
import StaffAmount from "./component/StaffAmount";
import OldStaffTable from "./component/OldStaffTable";
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

                {/* 工龄最老的员工表格 */}
                <OldStaffTable {...staffData} />
            </div>
        </Spin>
    );
};

export default Dashboard;
