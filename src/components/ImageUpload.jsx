import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { uploadAvatar } from '../api/avatar';

const ImageUpload = forwardRef(({ value, onChange, disabled, employeeId }, ref) => {
    const [loading, setLoading] = useState(false);
    const [tempFile, setTempFile] = useState(null);

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('只能上传 JPG/PNG 格式的图片!');
            return false;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片大小不能超过 2MB!');
            return false;
        }
        return true;
    };

    const customRequest = async ({ file, onSuccess, onError }) => {
        const formData = new FormData();
        formData.append('avatar', file);

        try {
            setLoading(true);
            if (!employeeId) {
                // 如果是新增员工场景，保存临时文件
                setTempFile(file);
                const previewUrl = URL.createObjectURL(file);
                onChange?.(previewUrl);
                onSuccess();
            } else {
                // 如果是编辑场景（包括表格内的头像上传）
                const result = await uploadAvatar(formData, employeeId);
                if (result.code === 0) {
                    onChange?.(result.data.url);
                    onSuccess(result, file);
                    message.success('上传成功');
                } else {
                    throw new Error(result.msg || '上传失败');
                }
            }
        } catch (error) {
            console.error('上传失败:', error);
            message.error(error.message || '上传失败');
            onError(error);
        } finally {
            setLoading(false);
        }
    };

    useImperativeHandle(ref, () => ({
        getTempFile: () => tempFile
    }));

    return (
        <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            customRequest={customRequest}
            disabled={disabled}
        >
            {value ? (
                <img
                    src={value}
                    alt="avatar"
                    className="w-full h-full object-cover"
                    style={{ width: '100%', height: '100%' }}
                    onError={(e) => {
                        e.target.src = '/default-avatar.png';
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
