// src/models/department.js
import { useState, useCallback } from 'react';
import { message } from 'antd';
import { getDepartmentList, getDepartmentDetail, addDepartment, deleteDepartment } from "../api/department";

// 添加延迟函数
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default function useDepartment() {
    const [loading, setLoading] = useState(false);
    const [departmentList, setDepartmentList] = useState([]);
    const [currentDepartment, setCurrentDepartment] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState('add'); // 'add' | 'view'

    // 获取部门列表
    const fetchDepartmentList = useCallback(async () => {
        setLoading(true);
        try {
            await delay(1000);
            const response = await getDepartmentList();
            if (response.code === 0) {
                setDepartmentList(response.data.list);
            } else {
                message.error('获取部门列表失败');
            }
        } catch (error) {
            console.error('获取部门列表失败:', error);
            message.error('获取部门列表失败');
        } finally {
            setLoading(false);
        }
    }, []);

    // 获取部门详情
    const fetchDepartmentDetail = useCallback(async (id) => {
        setLoading(true);
        try {
            const response = await getDepartmentDetail(id);
            if (response.code === 0) {
                setCurrentDepartment(response.data);
                setModalVisible(true);
                setModalType('view');
            } else {
                message.error('获取部门详情失败');
            }
        } catch (error) {
            console.error('获取部门详情失败:', error);
            message.error('获取部门详情失败');
        } finally {
            setLoading(false);
        }
    }, []);

    // 添加部门
    const handleAddDepartment = useCallback(async (values) => {
        setLoading(true);
        try {
            const response = await addDepartment(values);
            if (response.code === 0) {
                message.success('添加部门成功');
                setModalVisible(false);
                fetchDepartmentList();
            } else {
                message.error('添加部门失败');
            }
        } catch (error) {
            console.error('添加部门失败:', error);
            message.error('添加部门失败');
        } finally {
            setLoading(false);
        }
    }, [fetchDepartmentList]);

    // 删除部门
    const handleDeleteDepartment = useCallback(async (id) => {
        setLoading(true);
        try {
            const response = await deleteDepartment(id);
            if (response.code === 0) {
                message.success('删除部门成功');
                fetchDepartmentList();
            } else {
                message.error('删除部门失败');
            }
        } catch (error) {
            console.error('删除部门失败:', error);
            message.error('删除部门失败');
        } finally {
            setLoading(false);
        }
    }, [fetchDepartmentList]);

    // 打开新增部门模态框
    const showAddModal = useCallback(() => {
        setModalType('add');
        setCurrentDepartment(null);
        setModalVisible(true);
    }, []);

    // 关闭模态框
    const closeModal = useCallback(() => {
        setModalVisible(false);
        setCurrentDepartment(null);
    }, []);

    return {
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
    };
}
