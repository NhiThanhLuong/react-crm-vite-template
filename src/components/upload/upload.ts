import { MessageInstance } from 'antd/es/message/interface';
import { RcFile } from 'antd/es/upload';

export const getBase64 = (
  img: RcFile,
  callback: (base64String: string | ArrayBuffer | null) => void
) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

export const beforeUpload = (message: MessageInstance, file: File) => {
  const isJpgOrPng =
    file.type === 'image/jpeg' ||
    file.type === 'image/png' ||
    file.type === 'image/webp';
  if (!isJpgOrPng) {
    void message.error('Bạn chỉ được phép tải hình JPG/PNG/WEBP');
  }

  const isLt3M = file.size / 1024 / 1024 < 3;
  if (!isLt3M) {
    void message.error('Hình ảnh phải có dung lượng nhỏ hơn 3MB');
  }
  return isJpgOrPng && isLt3M;
};
