import { useApp } from '@/hooks';
import { getPathImg, localToken } from '@/utils';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload, UploadProps } from 'antd';
import { FC, useState } from 'react';
import styled from 'styled-components';
import { beforeUpload } from './upload';

type UploadStyleProps = UploadProps & {
  height?: number;
};

type Props = UploadStyleProps & {
  actionAPI?: string;
  isDisabled?: boolean;
  value?: string;
  onChange?: (_value: unknown) => void;
};

const UploadImage: FC<Props> = ({
  actionAPI = import.meta.env.VITE_UPLOAD_API,
  isDisabled,
  height = 256,
  value: imageURL,
  onChange,
  ...props
}) => {
  const { message } = useApp();
  const [loading, setLoading] = useState(false);

  const handleChange: UploadProps<{
    id: number;
  }>['onChange'] = (info) => {
    const status = info.file.status;

    if (status === 'uploading') {
      setLoading(true);
      return;
    }

    if (status === 'done') {
      const imageId = info.file.response?.id;

      setLoading(false);

      onChange!(imageId);
    } else {
      setLoading(false);
      void message.error('Upload hình thất bại');
    }
  };

  const uploadProps: UploadStyleProps = {
    accept: 'image/png, image/jpeg, image/webp',
    action: actionAPI,
    listType: 'picture-card',
    disabled: loading || isDisabled,
    headers: {
      authorization: `Bearer ${localToken as string}`,
    },
    showUploadList: false,
    onChange: handleChange,
    beforeUpload: (file) => beforeUpload(message, file),
    height,
  };

  return (
    <UploadStyle {...uploadProps} {...props}>
      {loading ? (
        <LoadingOutlined />
      ) : imageURL ? (
        <img
          className={'w-full h-full object-contain'}
          src={getPathImg(imageURL)}
          alt="avatar"
        />
      ) : (
        <PlusOutlined />
      )}
      {!imageURL && <div className="ml-1">Chọn ảnh</div>}
    </UploadStyle>
  );
};

export default UploadImage;

const UploadStyle = styled((props: UploadStyleProps) => <Upload {...props} />)`
  .ant-upload-select {
    height: ${(props) => props.height}px !important;
    width: auto !important;
    min-width: ${(props) => (props.height! * 2) / 3}px;
    padding-left: 8px;
    padding-right: 8px;
  }
`;
