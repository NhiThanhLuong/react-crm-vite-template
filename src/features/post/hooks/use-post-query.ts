import { useApp } from '@/hooks'
import { QueryOptions } from '@/ts/types'
import { createQueryKeys } from '@lukemorales/query-key-factory'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import postApi from '../services/post-api'
import { PostData, PostListData, PostListParams } from '../services/types'

const posts = createQueryKeys('posts', {
  list: (params: PostListParams) => ({
    queryKey: [params],
    queryFn: () => postApi.getList(params),
  }),
  detail: (id: number) => ({
    queryKey: [id],
    queryFn: () => postApi.getDetail(id),
  }),
})

export const usePostListQuery = (
  params: PostListParams = {},
  options: QueryOptions<PostListData> = {}
) => {
  return useQuery({
    ...posts.list(params),
    keepPreviousData: true,
    ...options,
  })
}

export const usePostDetailQuery = (
  id: number,
  options: QueryOptions<PostData> = {}
) => {
  return useQuery({
    ...posts.detail(id),
    ...options,
  })
}

export const useUpdatePostMutation = (id: number) => {
  const { message } = useApp()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: postApi.update(id),
    onSuccess: () => {
      void message.success('Cập nhật bài viết thành công')
      void queryClient.invalidateQueries(posts.detail(id).queryKey)
    },
    onError: () => {
      void message.error('Cập nhật bài viết thất bại')
    },
  })
}

export const useAddPostMutation = () => {
  const { message } = useApp()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: postApi.add,
    onSuccess: () => {
      void queryClient.invalidateQueries(posts.list._def)
    },
    onError: (
      errors: AxiosError<{
        message?: [string]
      }>
    ) => {
      void message.error('Tạo bài viết không thành công')
      void message.error(errors.response?.data.message?.at(0))
    },
  })
}
