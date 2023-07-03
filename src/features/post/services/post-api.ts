import axiosClient from '@/apis/axios-client'
import {
  BodyAddPost,
  BodyUpdatePost,
  PostData,
  PostListData,
  PostListParams,
} from './types'

const baseUrl = 'posts'

const postApi = {
  getList: (params: PostListParams): Promise<PostListData> =>
    axiosClient.get(baseUrl, { params }),

  getDetail: (id: number): Promise<PostData> =>
    axiosClient.get(`${baseUrl}/${id}`),

  update: (id: number) => (data: BodyUpdatePost) =>
    axiosClient.put(`${baseUrl}/${id}`, data),

  add: (data: BodyAddPost) => axiosClient.post(baseUrl, data),
}

export default postApi
