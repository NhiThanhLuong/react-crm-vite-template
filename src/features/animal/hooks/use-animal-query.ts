import { useApp } from '@/hooks'
import { QueryOptions } from '@/ts/types'
import { createQueryKeys } from '@lukemorales/query-key-factory'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ANIMAL_NAME } from '../animal-constant'
import animalApi from '../services/animal-api'
import { AnimalData, AnimalListParam, AnimalListQuery } from '../services/types'

const animals = createQueryKeys('animals', {
  list: (params: AnimalListParam) => ({
    queryKey: [params],
    queryFn: () => animalApi.getList(params),
  }),
  detail: (id: number) => ({
    queryKey: [id],
    queryFn: () => animalApi.getDetail(id),
  }),
})

export const useAnimalListQuery = <T>(
  params: AnimalListParam = {},
  options: QueryOptions<T[], AnimalListQuery> = {}
) => {
  return useQuery({
    ...animals.list(params),
    ...options,
  })
}

export const useAnimalDetailQuery = (
  id: number,
  options: QueryOptions<AnimalData> = {}
) => {
  return useQuery({
    ...animals.detail(id),
    ...options,
  })
}

export const useUpdateAnimalMutation = (id: number) => {
  const { message } = useApp()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: animalApi.update(id),
    onSuccess: () => {
      void message.success(`Cập nhật ${ANIMAL_NAME} thành công`)
      void queryClient.invalidateQueries(animals.detail(id).queryKey)
    },
    onError: () => {
      void message.error(`Cập nhật ${ANIMAL_NAME} thất bại`)
    },
  })
}
