import { ImageData } from '@/ts/types';
import axiosClient from './axios-client';

const mediaFileApi = (
  formData: FormData
): Promise<{
  id: string;
  link: string;
  variants: ImageData;
}> =>
  axiosClient.post('', formData, {
    baseURL: import.meta.env.VITE_UPLOAD_API,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export default mediaFileApi;
