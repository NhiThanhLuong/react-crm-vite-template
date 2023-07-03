import axiosClient from '@/apis/axios-client'
import { ImageConfigList, ImageConfigParams } from './types'

const baseUrl = 'images-configs'

const imageConfigApi = {
  getList: (params: ImageConfigParams): Promise<ImageConfigList> =>
    axiosClient.get(baseUrl, { params }),

  //   getDetail: (id: number): Promise<PostData> =>
  //     axiosClient.get(`${baseUrl}/${id}`),

  //   update: (id: number) => (data: BodyUpdatePost) =>
  //     axiosClient.put(`${baseUrl}/${id}`, data),
}

export default imageConfigApi
