import axiosClient from '@/apis/axios-client'
import {
  AnimalBodyAddProductGroup,
  AnimalBodyUpdateProductGroup,
  AnimalProductGroupData,
  AnimalProductGroupListData,
  AnimalProductGroupParams,
} from './types'

const baseUrl = 'products-groups'

const productGroupApi = {
  getList: (
    params: AnimalProductGroupParams
  ): Promise<AnimalProductGroupListData> =>
    axiosClient.get(baseUrl, { params }),

  getDetail: (id: number): Promise<AnimalProductGroupData> =>
    axiosClient.get(`${baseUrl}/${id}`),

  update: (id: number) => (data: AnimalBodyUpdateProductGroup) =>
    axiosClient.put(`${baseUrl}/${id}`, data),

  add: (data: AnimalBodyAddProductGroup) => axiosClient.post(baseUrl, data),
}

export default productGroupApi
