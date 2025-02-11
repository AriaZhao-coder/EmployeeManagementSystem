import { useState, useCallback, useRef } from 'react';
import {
    getStaffList,
    getStaffDetail,
    deleteStaff,
    addStaff,
    updateStaff
} from '../api/staff';


export default function useStaffModel() {
    // 状态管理
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [currentRecord, setCurrentRecord] = useState(null);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10
    });
    const [filters, setFilters] = useState({});

    // 用于防止重复请求
    const requestRef = useRef(null);

    // 核心数据加载方法
    const loadData = useCallback(async () => {
        // 取消之前的请求
        if (requestRef.current) {
            requestRef.current.abort();
        }

        // 创建新的 AbortController
        const controller = new AbortController();
        requestRef.current = controller;

        setLoading(true);
        try {
            const res = await getStaffList({
                page: pagination.current,
                size: pagination.pageSize,
                queryData: filters
            }, { signal: controller.signal });

            if (res.code === 0) {
                setData(res.data.staffList);
                setTotal(res.data.total);
            }
            return res;
        } catch (error) {
            if (error.name !== 'AbortError') {
                throw error;
            }
        } finally {
            setLoading(false);
            requestRef.current = null;
        }
    }, [pagination.current, pagination.pageSize, filters]);

    // 数据操作方法
    const operations = {
        // 获取详情
        fetchDetail: async (id) => {
            try {
                return await getStaffDetail(id);
            } catch (error) {
                throw error;
            }
        },

        // 删除员工
        removeStaff: async (id) => {
            try {
                const res = await deleteStaff(id);
                if (res.code === 0) {
                    // 处理删除后的页码逻辑
                    if (data.length === 1 && pagination.current > 1) {
                        setPagination(prev => ({
                            ...prev,
                            current: prev.current - 1
                        }));
                    } else {
                        await loadData();
                    }
                }
                return res;
            } catch (error) {
                throw error;
            }
        },

        // 新增员工
        addStaff: async (values) => {
            try {
                const res = await addStaff(values);
                if (res.code === 0) {
                    await loadData();
                }
                return res;
            } catch (error) {
                throw error;
            }
        },

        // 更新员工
        updateStaff: async (id, values) => {
            try {
                const res = await updateStaff(id, values);
                if (res.code === 0) {
                    await loadData();
                }
                return res;
            } catch (error) {
                throw error;
            }
        }
    };

    // 分页和筛选处理
    const handlers = {
        handlePaginationChange: (current, pageSize) => {
            setPagination({ current, pageSize });
        },

        handleFiltersChange: (newFilters) => {
            setFilters(newFilters);
            setPagination(prev => ({ ...prev, current: 1 }));
        },

        handleReset: () => {
            setFilters({});
            setPagination(prev => ({ ...prev, current: 1 }));
        }
    };

    return {
        // 状态
        loading,
        data,
        total,
        currentRecord,
        pagination,
        filters,

        // 状态设置器
        setCurrentRecord,

        // 数据加载
        loadData,

        // 操作方法
        ...operations,

        // 事件处理器
        ...handlers
    };
}
