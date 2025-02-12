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
                if (!currentRecord?.id) {
                    // 新增员工
                    let staffData = { ...values };
                    delete staffData.avatarFile;

                    // 先创建员工记录
                    const addRes = await addStaff(staffData);
                    if (addRes?.code !== 0) {
                        throw new Error(addRes?.msg || '新增员工失败');
                    }

                    // 如果有头像文件，上传头像
                    if (values.avatarFile) {
                        const formData = new FormData();
                        formData.append('avatar', values.avatarFile);
                        const uploadRes = await uploadAvatar(formData, addRes.data.id);

                        if (uploadRes?.code === 0) {
                            // 更新员工头像
                            await updateStaff(addRes.data.id, { avatar: uploadRes.data.url });
                        }
                    }

                    message.success('新增成功');
                } else {
                    // 编辑现有员工
                    const res = await updateStaff(currentRecord.id, values);
                    if (res?.code !== 0) {
                        throw new Error(res?.msg || '更新失败');
                    }
                    message.success('更新成功');
                }

                setModalState(prev => ({ ...prev, visible: false }));
                loadData(); // 刷新列表
            } catch (error) {
                message.error(error.message || '操作失败');
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
                    onUpdateAvatar={async (id, url) => {
                        try {
                            const res = await updateStaff(id, { avatar: url });
                            if (res?.code === 0) {
                                loadData();
                            } else {
                                message.error(res?.msg || '头像更新失败');
                            }
                        } catch (error) {
                            message.error('头像更新失败');
                        }
                    }}
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
