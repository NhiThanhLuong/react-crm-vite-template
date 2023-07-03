import { EnumPostCategoryType, PostList } from '@/features/post'
import { FC } from 'react'

const PostIntroductionList: FC = () => {
  return <PostList postCategoryType={EnumPostCategoryType['INTRODUCTION']} />
}

export default PostIntroductionList
