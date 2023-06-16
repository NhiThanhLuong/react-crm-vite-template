import {
  DateRangeParams,
  ImageData,
  ListData,
  NumberEnumUnion,
  PageParams,
} from '@/ts/types';
import { EnumPostCategoryType, EnumPostStatus, EnumPostType } from './enums';

export type PostData = {
  id: number;
  createdAt: string;
  updatedAt: string;
  lang: string;
  title: string;
  shortTitle: string;
  content: string;
  shortContent: string;
  status: NumberEnumUnion<typeof EnumPostStatus>;
  type: NumberEnumUnion<typeof EnumPostType>;
  postCategory: {
    id: number;
    name: string;
  };
  images: {
    avatar?: ImageData;
  };
  keyWords: string[];
  alt: string;
  postCategoryId: number;
  creatorId: number;
  creatorInfo: {
    id: number;
    name: string;
  };
  relatedAnimal?: [
    {
      id: number;
      animal: {
        id: number;
        name: string;
      };
    }
  ];
};

export type PostListParams = PageParams &
  DateRangeParams &
  Partial<
    Pick<PostData, 'id' | 'title' | 'status' | 'type' | 'postCategoryId'> & {
      animalId: number;
      postCategoryType: NumberEnumUnion<typeof EnumPostCategoryType>;
    }
  >;

export type BodyUpdatePost = Partial<
  Pick<
    PostData,
    | 'lang'
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
      avatar?: string;
    };
    animalIds: number[];
    productIds: number[];
    postIds: number[];
  }
>;

export type PostListData = ListData<PostData>;
