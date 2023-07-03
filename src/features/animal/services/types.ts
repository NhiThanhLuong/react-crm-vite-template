import { EnumStatus } from '@/ts/enums'
import { ImageData, ListData, PageParams } from '@/ts/types'

export type AnimalData = {
  id: number
  name: string
  status: EnumStatus
  images: {
    avatar?: ImageData
    banner?: ImageData
  }
}

export type AnimalListParam = Partial<Pick<AnimalData, 'status'>>

export type BodyUpdateAnimal = Partial<{
  name: string
  images: Partial<{
    avatar: string
    banner: string
  }>
}>

export type AnimalListQuery = ListData<AnimalData>

// Product Group
export type AnimalProductGroupData = {
  id: number
  animalId: number
  status: EnumStatus
  name: string
  description: string
  images: {
    avatar: ImageData
  }
  createdAt: string
  updatedAt: string
}

export type AnimalProductGroupListData = ListData<AnimalProductGroupData>

export type AnimalProductGroupParams = PageParams & {
  animalIds: number
}

export type AnimalBodyAddProductGroup = Pick<
  AnimalProductGroupData,
  'name' | 'status' | 'animalId' | 'description'
> & {
  animalId: number
  images: {
    avatar: string
  }
}

export type AnimalBodyUpdateProductGroup = Partial<AnimalBodyAddProductGroup>
