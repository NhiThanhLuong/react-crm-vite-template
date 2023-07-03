import { useQuery } from '@tanstack/react-query'
import { EnumPostCategoryType } from '../services/enums'
import postCategoryApi from '../services/post-category-api'

export const usePostCategoryQuery = (type: EnumPostCategoryType) => {
  return useQuery({
    queryKey: ['posts', 'categories'],
    queryFn: () => postCategoryApi.getList(type),
    select: (data) =>
      data.data.map((item) => ({
        value: item.id,
        label: item.name,
      })),
  })
}
