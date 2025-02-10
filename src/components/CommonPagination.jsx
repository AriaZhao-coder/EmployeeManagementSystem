import React from 'react';
import { Pagination } from 'antd';

const CommonPagination = ({
                              current = 1,
                              total = 0,
                              pageSize = 10,
                              onChange,
                              className = 'flex justify-end mt-4'
                          }) => {
    return (
        <div className={className}>
            <Pagination
                current={current}
                total={total}
                pageSize={pageSize}
                onChange={onChange}
                showSizeChanger
                showQuickJumper
                showTotal={(total) => `共 ${total} 条`}
            />
        </div>
    );
};

export default CommonPagination
