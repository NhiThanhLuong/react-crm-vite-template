import { EnumPostCategoryType, PostAdd } from '@/features/post'
import { FC } from 'react'

const PostIntroductionAdd: FC = () => {
  return <PostAdd postCategoryType={EnumPostCategoryType['INTRODUCTION']} />
}

export default PostIntroductionAdd
