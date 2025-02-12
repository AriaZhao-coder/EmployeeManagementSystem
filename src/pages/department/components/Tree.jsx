import React from 'react';
import Tree from 'react-org-tree';
import '../css/style.css';
const Treelist = ({
                             departmentList = [],
                             onNodeClick,
                             currentDepartmentId
                         }) => {
    // 转换数据格式
    const transformData = (departments) => {
        if (!departments.length) return null;

        const transformNode = (dept) => ({
            id: dept.id,
            label: dept.departmentName,
            children: dept.children?.length ? dept.children.map(transformNode) : null,
            staffCount: dept.staffCount || 0
        });

        // 创建根节点
        return {
            id: 'root',
            label: '公司组织架构',
            children: departments.map(transformNode)
        };
    };

    const data = transformData(departmentList);

    // 自定义节点内容
    const renderContent = (data) => {
        const isSelected = data.id === currentDepartmentId;
        return (
            <div
                className={`tree-node ${isSelected ? 'selected' : ''}`}
                onClick={() => data.id !== 'root' && onNodeClick(data.id)}
            >
                <div className="label">{data.label}</div>
                {data.id !== 'root' && (
                    <div className="staff-count">{data.staffCount}人</div>
                )}
            </div>
        );
    };

    return (
        <div className="org-chart-container">
            {data && (
                <Tree
                    data={data}
                    horizontal={false}
                    collapsable={false}
                    renderContent={renderContent}
                    labelWidth={150}
                    labelHeight={80}
                />
            )}

        </div>
    );
};

export default Treelist;
