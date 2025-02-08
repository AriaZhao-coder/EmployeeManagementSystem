import React from 'react';
import ReactECharts from 'echarts-for-react';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}年${month}月${day}日`;
};

const ViolationChart = ({title, renderList}) => {
    const options = {
        title: {text: title},
        tooltip: { trigger: 'axis'},
        yAxis: [{
            type: 'value',
            minInterval: 1
        }],
        xAxis: [{
            type: 'category',
            data: renderList.xData.map(date => formatDate(date)),
        }],
        dataZoom:[
            {
                type: 'slider',
                show: true,
                xAxisIndex:[0],
                left: '9%',
                bottom:-1,
                end:50,
            }
        ],
        series: [{
            name: title + '人数',
            type: 'bar',
            data: renderList.yData,
            label:{
                show: true,
                precision: 1,
                position: 'top',
                valueAnimation: true,
            }
        }]
    }
    return (
        <div className="block-container">
            <ReactECharts className="react_for_echarts" style={{width:'100%',height:'400px'}} option={options} />
        </div>
    );
};

export default ViolationChart;
