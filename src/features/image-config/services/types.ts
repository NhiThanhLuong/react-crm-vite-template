import { ImageData, ListData, PageParams } from '@/ts/types'
import { EnumImageConfigType } from './enums'
import { EnumStatus } from '@/ts/enums'

export type ImageConfigData = {
  id: number
  createdAt: string
  status: EnumStatus
  type: EnumImageConfigType
  images: {
    avatar: ImageData
  }
}

export type ImageConfigParams = PageParams & {
  type?: EnumImageConfigType
}

export type ImageConfigList = ListData<ImageConfigData>
