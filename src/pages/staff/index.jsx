import React, { useState, useEffect } from 'react';
import { Card, Button, message } from 'antd';
import { useModel } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import StaffFilter from './components/StaffFilter';
import StaffTable from './components/StaffTable';
import StaffModal from './components/StaffModal';
import CommonPagination from '@/components/CommonPagination';

const StaffPage = () => {
    const [modalState, setModalState] = useState({
        visible: false,
        loading: false,
        title: ''
    });

    const {
        loading: tableLoading,
        data,
        total,
        currentRecord,
        pagination,
        setCurrentRecord,
        loadData,
        fetchDetail,
        removeStaff,
        addStaff,
        updateStaff,
        handlePaginationChange,
        handleFiltersChange,
        handleReset
    } = useModel('staff');

    // 初始加载数据
    useEffect(() => {
        loadData();
    }, [pagination.current, pagination.pageSize, loadData]);

    // Modal 相关处理方法
    const modalHandlers = {
        handleAdd: () => {
            setCurrentRecord(null);
            setModalState({
                visible: true,
                loading: false,
                title: '新增员工'
            });
        },

        handleEdit: async (record) => {
            setModalState(prev => ({ ...prev, loading: true }));
            try {
                const res = await fetchDetail(record.id);
                if (res?.code === 0) {
                    setCurrentRecord(res.data);
                    setModalState({
                        visible: true,
                        loading: false,
                        title: '员工信息'
                    });
                } else {
                    message.error(res?.msg || '获取员工信息失败');
                }
            } catch (error) {
                message.error('获取员工信息失败');
            }
        },

        handleDelete: async (id) => {
            try {
                const res = await removeStaff(id);
                if (res?.code === 0) {
                    message.success('删除成功');
                }
            } catch (error) {
                message.error('删除失败');
            }
        },

        handleModalOk: async (values) => {
            setModalState(prev => ({ ...prev, loading: true }));
            try {
                const operation = currentRecord?.id ?
                    () => updateStaff(currentRecord.id, values) :
                    () => addStaff(values);

                const res = await operation();

                if (res?.code === 0) {
                    message.success(`${currentRecord ? '更新' : '新增'}成功`);
                    setModalState(prev => ({ ...prev, visible: false }));
                } else if (res?.code === 403) {
                    message.error(`没有${currentRecord ? '编辑' : '新增'}权限`);
                } else {
                    message.error(res?.msg || `${currentRecord ? '更新' : '新增'}失败`);
                }
            } catch (error) {
                message.error('操作失败');
            } finally {
                setModalState(prev => ({ ...prev, loading: false }));
            }
        },

        handleModalCancel: () => {
            setModalState(prev => ({ ...prev, visible: false }));
            setCurrentRecord(null);
        }
    };

    return (
        <div className="staff-page">
            <StaffFilter
                loading={tableLoading}
                onSearch={handleFiltersChange}
                onReset={handleReset}
            />

            <Card>
                <div className="mb-4">
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={modalHandlers.handleAdd}
                    >
                        新增员工
                    </Button>
                </div>

                <StaffTable
                    loading={tableLoading}
                    dataSource={data}
                    onEdit={modalHandlers.handleEdit}
                    onDelete={modalHandlers.handleDelete}
                    onUpdateAvatar={(id, avatarUrl) =>
                        updateStaff(id, { avatar: avatarUrl })
                    }
                />

                <CommonPagination
                    current={pagination.current}
                    total={total}
                    pageSize={pagination.pageSize}
                    onChange={handlePaginationChange}
                />
            </Card>

            <StaffModal
                {...modalState}
                initialValues={currentRecord}
                onOk={modalHandlers.handleModalOk}
                onCancel={modalHandlers.handleModalCancel}
            />
        </div>
    );
};

export default StaffPage;
