import React, { useState, useEffect, useImperativeHandle } from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { uploadAvatar, updateEmployeeAvatar, getFullImageUrl } from '../api/avatar';  // 导入API服务

const ImageUpload = React.forwardRef(({ value, onChange, employeeId }, ref) => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        if (value) {
            setImageUrl(getFullImageUrl(value));
        }
    }, [value]);

    const customRequest = async ({ file, onSuccess, onError }) => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('avatar', file);

            // 根据是否有employeeId决定使用哪个接口
            const uploadFunction = employeeId ? updateEmployeeAvatar : uploadAvatar;
            const result = await uploadFunction(formData, employeeId);

            if (result.code === 0) {
                const fullUrl = getFullImageUrl(result.data.url);
                setImageUrl(fullUrl);
                onChange?.(result.data.url);
                onSuccess();
                message.success('上传成功');
            } else {
                throw new Error(result.msg || '上传失败');
            }
        } catch (error) {
            console.error('上传失败:', error);
            message.error(error.message || '上传失败');
            onError(error);
        } finally {
            setLoading(false);
        }
    };


    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('只能上传 JPG/PNG 格式的图片！');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片大小不能超过 2MB！');
        }
        return isJpgOrPng && isLt2M;
    };

    return (
        <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            customRequest={customRequest}
        >
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt="avatar"
                    className="w-full h-full object-cover"
                    style={{ width: '100%', height: '100%' }}
                    onError={(e) => {
                        const baseUrl = request.defaults.baseURL.replace('/api', '');
                        e.target.src = `${baseUrl}/images/default.jpg`;
                    }}
                />
            ) : (
                <div>
                    {loading ? <LoadingOutlined /> : <PlusOutlined />}
                    <div className="mt-2">点击上传</div>
                </div>
            )}
        </Upload>
    );
});

ImageUpload.displayName = 'ImageUpload';

export default ImageUpload;
