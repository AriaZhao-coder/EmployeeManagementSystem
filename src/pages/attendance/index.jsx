import React, { useEffect } from 'react';
import { useModel } from '@umijs/max';
import { Spin } from 'antd';
import ViolationChart from './component/ViolationChart';
import ViolationTable from "./component/ViolationTable";
import './css/attendance.css'

function Attendance(props) {
    const { loading, tableList, chartList, fetchAttendanceData } = useModel('attendance');
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        fetchAttendanceData();
    }, [fetchAttendanceData]);

    // 添加数据校验
    const hasChartData = Array.isArray(chartList) && chartList.length > 0;
    const hasTableData = Array.isArray(tableList) && tableList.length > 0;

    return (
        <Spin spinning={loading} tip="Loading...">
            <div className="attendance-container">
                {userInfo.role === 'Admin' && hasChartData && (
                    <div className="chart-list-container">
                        {chartList.map((item, index) => (
                            <ViolationChart
                                key={index}
                                {...item}
                            />
                        ))}
                    </div>
                )}
                {hasTableData && (
                    <div
                        className="table-list-container"
                        style={{
                            width: userInfo.role === 'Admin' ? '49.8%' : '100%'
                        }}
                    >
                        {tableList.map((item, index) => (
                            <ViolationTable
                                key={index}
                                {...item}
                            />
                        ))}
                    </div>
                )}
            </div>
        </Spin>
    );
}

// 组件名称首字母大写
export default Attendance;
