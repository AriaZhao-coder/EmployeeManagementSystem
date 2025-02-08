import React from 'react';
import ReactECharts from 'echarts-for-react';

const Column = ({ title, renderList, styleData }) => {
    // 转换数据为数组格式
    const dataToArray = () => {
        const xAxisData = [];
        const seriesData = [];

        // 检查数据格式，区分年龄分布和部门分布
        const firstValue = Object.values(renderList)[0];
        if (typeof firstValue === 'object' && firstValue !== null) {
            // 部门分布数据
            for (const [dept, data] of Object.entries(renderList)) {
                xAxisData.push(dept);
                seriesData.push(data.count);
            }
        } else {
            // 年龄分布数据
            for (const [age, count] of Object.entries(renderList)) {
                xAxisData.push(age);
                seriesData.push(count);
            }
        }

        return { xAxisData, seriesData };
    };

    const { xAxisData, seriesData } = dataToArray();

    const option = {
        title: {text: title},
        tooltip: {trigger: 'axis'},
        xAxis: {
            type: 'category',
            data: xAxisData,
            axisLabel: {
                interval: 0,
                rotate: 30
            }
        },
        yAxis: {
            type: 'value',
        },
        series: [{
            name: '人数',
            data: seriesData,
            type: 'bar',
            barWidth: '40%',
            itemStyle: {
                color: '#5430c2'
            }
        }]
    };

    return (
        <div className="staff-amount-container" style={{...styleData}}>
            <ReactECharts className="react_for_echarts" option={option} />
        </div>
    );
};

export default Column;
