import {
  DateRangeParams,
  ImageData,
  ListData,
  PageParams,
  RequiredKeys,
} from '@/ts/types'
import { EnumPostCategoryType, EnumPostStatus, EnumPostType } from './enums'

export type PostData = {
  id: number
  createdAt: string
  updatedAt: string
  lang: string
  title: string
  shortTitle: string
  content: string
  shortContent: string
  status: EnumPostStatus
  type: EnumPostType
  postCategory: {
    id: number
    name: string
  }
  linked?: {
    video: string
  }
  images: {
    avatar?: ImageData
  }
  keyWords: string[]
  alt: string
  postCategoryId: number
  creatorId: number
  creatorInfo: {
    id: number
    name: string
  }
  relatedAnimal: [
    {
      id: number
      animal: {
        id: number
        name: string
      }
    }
  ]
  relatedPost: {
    postRelated: RelatedPostData
  }[]
}

export type PostListParams = PageParams &
  DateRangeParams &
  Partial<
    Pick<PostData, 'id' | 'title' | 'status' | 'type' | 'postCategoryId'> & {
      animalId: number
      postCategoryType: EnumPostCategoryType
    }
  >

export type BodyUpdatePost = Partial<
  Pick<
    PostData,
    | 'title'
    | 'shortTitle'
    | 'content'
    | 'shortContent'
    | 'status'
    | 'type'
    | 'alt'
    | 'postCategoryId'
    | 'keyWords'
  > & {
    images: {
      avatar?: string
    }
    animalIds: number[]
    productIds: number[]
    postIds: number[]
  }
>
export type PostListData = ListData<PostData>

export type BodyAddPost = RequiredKeys<
  BodyUpdatePost,
  'title' | 'shortTitle' | 'content' | 'shortContent' | 'type'
>

//Post Related Post
export type PostRelatedPostParams = PageParams & {
  postId: number
}

export type RelatedPostData = Pick<
  PostData,
  'id' | 'shortTitle' | 'shortContent' | 'status' | 'images'
>

export type PostRelatedPostListData = ListData<{
  id: number
  postRelated: RelatedPostData
}>
