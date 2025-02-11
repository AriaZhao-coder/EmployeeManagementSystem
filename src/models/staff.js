import { useState, useCallback } from 'react';
import {
    getStaffList,
    getStaffDetail,
    deleteStaff,
    addStaff,
    updateStaff
} from '../api';
import { message } from 'antd';

export default function useStaffModel() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [currentRecord, setCurrentRecord] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [queryData, setQueryData] = useState({});

    // 获取员工列表
    const fetchList = useCallback(async (params = {}) => {
        setLoading(true);
        try {
            const res = await getStaffList({
                page: currentPage,
                size: pageSize,
                queryData: {
                    ...queryData,
                    ...params
                }
            });
            if (res.code === 0) {
                setData(res.data.staffList);
                setTotal(res.data.total);
            }
            return res;
        } catch (error) {
            message.error('获取员工列表失败');
        } finally {
            setLoading(false);
        }
    }, [currentPage, pageSize, queryData]);

    // 获取员工详情
    const fetchDetail = useCallback(async (id) => {
        setLoading(true);
        try {
            const res = await getStaffDetail(id);
            if (res.code === 0) {
                setCurrentRecord(res.data);
            }
            return res;
        } catch (error) {
            message.error('获取员工详情失败');
        } finally {
            setLoading(false);
        }
    }, []);

    // 删除员工
    const removeStaff = useCallback(async (id) => {
        try {
            const res = await deleteStaff(id);
            if (res.code === 0) {
                message.success('删除成功');
                await fetchList();
            } else if (res.code === 403) {
                message.error('没有删除权限');
            } else {
                message.error(res.msg || '删除失败');
            }
            return res;
        } catch (error) {
            message.error('删除失败');
        }
    }, [fetchList]);

    // 新增员工
    const addNewStaff = useCallback(async (values) => {
        try {
            const res = await addStaff(values);
            if (res.code === 0) {
                message.success('新增成功');
                await fetchList();
            } else if (res.code === 403) {
                message.error('没有新增权限');
            } else {
                message.error(res.msg || '新增失败');
            }
            return res;
        } catch (error) {
            message.error('新增失败');
        }
    }, [fetchList]);

    // 更新员工
    const updateStaffInfo = useCallback(async (id, values) => {
        try {
            const res = await updateStaff(id, values);
            if (res.code === 0) {
                message.success('更新成功');
                await fetchList();
            } else if (res.code === 403) {
                message.error('没有修改权限');
            } else {
                message.error(res.msg || '更新失败');
            }
            return res;
        } catch (error) {
            message.error('更新失败');
        }
    }, [fetchList]);

    // 处理筛选
    const handleSearch = useCallback((values) => {
        setCurrentPage(1);
        setQueryData(values);
        fetchList(values);
    }, [fetchList]);

    // 处理重置
    const handleReset = useCallback(() => {
        setCurrentPage(1);
        setQueryData({});
        fetchList();
    }, [fetchList]);

    // 处理分页变化
    const handlePageChange = useCallback((page, size) => {
        setCurrentPage(page);
        setPageSize(size);
    }, []);

    return {
        loading,
        data,
        total,
        currentRecord,
        currentPage,
        pageSize,
        setCurrentRecord,
        fetchList,
        fetchDetail,
        removeStaff,
        addNewStaff,
        updateStaffInfo,
        handleSearch,
        handleReset,
        handlePageChange
    };
}
