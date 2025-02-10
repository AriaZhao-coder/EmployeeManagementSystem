import React, { useState, useEffect } from 'react';
import { Card, Button, message } from 'antd';
import { useModel } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import StaffFilter from './components/StaffFilter';
import StaffTable from './components/StaffTable';
import StaffModal from './components/StaffModal';
import CommonPagination from '../../components/CommonPagination';
import './staff.less'

const StaffPage = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const {
        loading,
        data,
        total,
        currentRecord,
        currentPage,
        pageSize,
        setCurrentRecord,
        fetchList,
        removeStaff,
        addNewStaff,
        updateStaffInfo,
        handleSearch,
        handleReset,
        handlePageChange
    } =useModel('staff');

    useEffect(() => {
        fetchList();
    }, [currentPage, pageSize, fetchList]);

    // 处理编辑
    const handleEdit = (record) => {
        setCurrentRecord(record);
        setModalVisible(true);
    };

    // 处理新增/编辑提交
    const handleModalOk = async (values) => {
        const api = currentRecord ?
            () => updateStaffInfo(currentRecord.id, values) :
            () => addNewStaff(values);

        const res = await api();
        if (res?.code === 0) {
            setModalVisible(false);
            setCurrentRecord(null);
        }
    };

    // 处理头像更新
    const handleUpdateAvatar = async (id, avatarUrl) => {
        await updateStaffInfo(id, { avatar: avatarUrl });
    };

    return (
        <div className="staff-page">
            <StaffFilter
                loading={loading}
                onSearch={handleSearch}
                onReset={handleReset}
            />

            <Card>
                <div className="mb-4">
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            setCurrentRecord(null);
                            setModalVisible(true);
                        }}
                    >
                        新增员工
                    </Button>
                </div>

                <StaffTable
                    loading={loading}
                    dataSource={data}
                    onEdit={handleEdit}
                    onDelete={removeStaff}
                    onUpdateAvatar={handleUpdateAvatar}
                />

                <CommonPagination
                    current={currentPage}
                    total={total}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                />
            </Card>

            <StaffModal
                visible={modalVisible}
                loading={loading}
                initialValues={currentRecord}
                onOk={handleModalOk}
                onCancel={() => {
                    setModalVisible(false);
                    setCurrentRecord(null);
                }}
            />
        </div>
    );
};

export default StaffPage;
