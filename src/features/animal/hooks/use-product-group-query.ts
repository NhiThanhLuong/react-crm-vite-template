import { useApp } from '@/hooks'
import { QueryOptions } from '@/ts/types'
import { createQueryKeys } from '@lukemorales/query-key-factory'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import productGroupApi from '../services/product-group-api'
import {
  AnimalProductGroupData,
  AnimalProductGroupParams,
} from '../services/types'

const productGroups = createQueryKeys('productGroups', {
  list: (params: AnimalProductGroupParams) => ({
    queryKey: [params],
    queryFn: () => productGroupApi.getList(params),
  }),
  detail: (id: number) => ({
    queryKey: [id],
    queryFn: () => productGroupApi.getDetail(id),
  }),
})

export const useAnimaProductGroupQuery = (params: AnimalProductGroupParams) => {
  return useQuery({
    ...productGroups.list(params),
    keepPreviousData: true,
  })
}

export const useAnimaProductGroupDetailQuery = (
  id: number,
  options: QueryOptions<AnimalProductGroupData> = {}
) => {
  return useQuery({ ...productGroups.detail(id), ...options })
}

export const useUpdateProductGroupMutation = (id: number) => {
  const { message } = useApp()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: productGroupApi.update(id),
    onSuccess: () => {
      void message.success('Cập nhật nhóm sản phẩm thành công')
      void queryClient.invalidateQueries(productGroups.list._def)
    },
    onError: () => {
      void message.error('Cập nhật nhóm sản phẩm thất bại')
    },
  })
}

export const useAddProductGroupMutation = () => {
  const { message } = useApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: productGroupApi.add,
    onSuccess: () => {
      void message.success('Đã thêm mới một nhóm sản phẩm')
      void queryClient.invalidateQueries(productGroups.list._def)
    },
    onError: (
      errors: AxiosError<{
        message?: [string]
      }>
    ) => {
      void message.error('Thêm nhóm sản phẩm không thành công')
      void message.error(errors.response?.data.message?.at(0))
    },
  })
}
