import { EnumPostCategoryType, PostDetail } from '@/features/post'
import { FC } from 'react'

const PostIntroductionDetail: FC = () => {
  return <PostDetail postCategoryType={EnumPostCategoryType['INTRODUCTION']} />
}

export default PostIntroductionDetail
