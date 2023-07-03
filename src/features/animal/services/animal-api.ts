import axiosClient from '@/apis/axios-client'
import {
  AnimalData,
  AnimalListParam,
  AnimalListQuery,
  BodyUpdateAnimal,
} from './types'

const baseUrl = 'animals'

const animalApi = {
  getList: (params: AnimalListParam): Promise<AnimalListQuery> =>
    axiosClient.get(baseUrl, { params }),

  getDetail: (id: number): Promise<AnimalData> =>
    axiosClient.get(`${baseUrl}/${id}`),

  update: (id: number) => (data: BodyUpdateAnimal) =>
    axiosClient.put(`${baseUrl}/${id}`, data),
}

export default animalApi
