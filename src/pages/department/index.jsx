import React, { useEffect } from 'react';
import { Button, Card, Modal, Drawer} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import TreeList from './components/Tree';
import DepartmentModal from './components/Modal';
import './css/style.css';


const DepartmentPage = () => {
    const {
        loading,
        departmentList,
        currentDepartment,
        modalVisible,
        modalType,
        fetchDepartmentList,
        fetchDepartmentDetail,
        handleAddDepartment,
        handleDeleteDepartment,
        showAddModal,
        closeModal
    } = useModel('department');

    useEffect(() => {
        fetchDepartmentList();
    }, [fetchDepartmentList]);

    // 确认删除处理
    const handleConfirmDelete = (departmentId) => {
        Modal.confirm({
            title: '确认删除',
            content: '确定要删除该部门吗？删除后不可恢复。',
            okText: '确定',
            cancelText: '取消',
            onOk: () => handleDeleteDepartment(departmentId)
        });
    };

    const renderDepartmentDetail = () => {
        if (!currentDepartment) return null;
        return (
            <>
                <div className="detail-header">
                    <h3>{currentDepartment.departmentName}</h3>
                    <div className="header-info">
                        <span>部门人数：{currentDepartment.staffCount}人</span>
                        {currentDepartment.parentLists?.length > 0 && (
                            <span>上级部门：{currentDepartment.parentLists.map(p => p.departmentName).join(' / ')}</span>
                        )}
                    </div>
                </div>

                {currentDepartment.staffList?.length > 0 && (
                    <div className="detail-staff">
                        <h4>部门成员</h4>
                        <div className="staff-grid">
                            {currentDepartment.staffList.map(staff => (
                                <div key={staff.id} className="staff-card">
                                    <div className="staff-name">{staff.realName}</div>
                                    <div className="staff-info">
                                        <span>{staff.gender}</span>
                                        <span>{staff.education}</span>
                                        <span>{staff.jobLevel || '未设置职级'}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </>
        );
    };

    return (
        <div className="department-page">
            <Card
                title="部门管理"
                extra={
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={showAddModal}
                    >
                        新增部门
                    </Button>
                }
            >
                <TreeList
                    departmentList={departmentList}
                    onNodeClick={fetchDepartmentDetail}
                    currentDepartmentId={currentDepartment?.id}
                    onDelete={handleConfirmDelete}
                />
            </Card>

            <Drawer
                title="部门详情"
                placement="right"
                onClose={closeModal}
                open={modalVisible && modalType === 'view'}
                width={480}
            >
                {renderDepartmentDetail()}
            </Drawer>

            <DepartmentModal
                visible={modalVisible && modalType === 'add'}
                type="add"
                onCancel={closeModal}
                onOk={handleAddDepartment}
                departmentList={departmentList}
                loading={loading}
            />
        </div>
    );
};

export default DepartmentPage;
