import React from 'react';
import StaffAmount from "./component/StaffAmount";
import './css/dashboard.css';
const amountDataList = [
    {
        title:'总人数',amount:17,styleData: {width:'100%',height:'170px'},
    },
    {
        title:'入职1年内的员工',amount:13,styleData: {width:'33%',height:'170px'},
    },
    {
        title:'入职1-2内的员工',amount:0,styleData: {width:'33%',height:'170px'},
    },
    {
        title:'入职3年以上员工',amount:4,styleData: {width:'33%',height:'170px'},
    }
];

const staffList = {
    title:'工龄最老的十个人',
    renderList: [{
        'userName': '小坏蛋',
        'department': '研发部'
    },
    {
        'userName': '管理员',
        'department': '总裁办'
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
    },
    ]
}


function Dashboard() {
    return (
        <div className="dashboard-container">
            {/* 员工展示组件 */}
            {amountDataList.map((item, index) => (
                <StaffAmount
                    key={index}
                    title={item.title}
                    amount={item.amount}
                    styleData={item.styleData}
                />
            ))}
        </div>
    );
}

export default Dashboard;
