import { cyan, gold, lime, red } from '@ant-design/colors'
import { EnumPostCategoryType, EnumPostStatus } from './services/enums'

export const POST_PATH = {
  MAIN: '/posts',
  [EnumPostCategoryType['INTRODUCTION']]: '/posts/introductions',
  [EnumPostCategoryType['LIBRARY']]: '/posts/libraries',
}

export const POST_NAME = {
  MAIN: 'bài viết',
  [EnumPostCategoryType['INTRODUCTION']]: 'giới thiệu',
  [EnumPostCategoryType['LIBRARY']]: 'thư viện',
}

export const POST_BREADCRUMBS = (type: EnumPostCategoryType) => {
  const listPath = {
    title: `Danh sách ${POST_NAME.MAIN} - ${POST_NAME[type]}`,
    url: POST_PATH[type],
  }

  return {
    list: [
      {
        title: listPath.title,
      },
    ],

    detail: [
      listPath,
      {
        title: `Chi tiết ${POST_NAME.MAIN}`,
      },
    ],

    add: [
      listPath,
      {
        title: `Tạo mới ${POST_NAME.MAIN}`,
      },
    ],
  }
}

export const POST_STATUS = {
  [EnumPostStatus['PENDING']]: {
    value: EnumPostStatus['PENDING'],
    label: 'Tạm ngưng',
    color: gold[6]!,
    nextActions: [EnumPostStatus['CANCEL'], EnumPostStatus['ACTIVE']],
  },
  [EnumPostStatus['DRAFT']]: {
    value: EnumPostStatus['DRAFT'],
    label: 'Lưu nháp',
    color: cyan[6]!,
    nextActions: [EnumPostStatus['ACTIVE']],
  },
  [EnumPostStatus['CANCEL']]: {
    value: EnumPostStatus['CANCEL'],
    label: 'Hủy bỏ',
    color: red[6]!,
    nextActions: [],
  },
  [EnumPostStatus['ACTIVE']]: {
    value: EnumPostStatus['ACTIVE'],
    label: 'Phát hành',
    color: lime[6]!,
    nextActions: [EnumPostStatus['PENDING']],
  },
}
export const POST_STATUS_LIST = Object.values(POST_STATUS)
