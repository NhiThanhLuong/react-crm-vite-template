import { useQuery } from '@tanstack/react-query';
import postCategoryApi from '../services/post-category-api';
import { NumberEnumUnion } from '@/ts/types';
import { EnumPostCategoryType } from '../services/enums';

export const usePostCategoryQuery = (
  type: NumberEnumUnion<typeof EnumPostCategoryType>
) => {
  return useQuery({
    queryKey: ['posts', 'categories'],
    queryFn: () => postCategoryApi.getList(type),
    select: (data) =>
      data.data.map((item) => ({
        value: item.id,
        label: item.name,
      })),
  });
};
