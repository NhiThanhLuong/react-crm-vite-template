import { createQueryKeys } from '@lukemorales/query-key-factory'
import imageConfigApi from '../services/image-config-api'
import { ImageConfigParams } from '../services/types'
import { useQuery } from '@tanstack/react-query'

const imagesConfig = createQueryKeys('imagesConfig', {
  list: (params: ImageConfigParams) => ({
    queryKey: [params],
    queryFn: () => imageConfigApi.getList(params),
  }),
  // detail: (id: number) => ({
  //   queryKey: [id],
  //   queryFn: () => postApi.getDetail(id),
  // }),
})

export const useImageConfigQuery = (params: ImageConfigParams = {}) => {
  return useQuery({
    ...imagesConfig.list(params),
    keepPreviousData: true,
  })
}
