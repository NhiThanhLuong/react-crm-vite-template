import { EnumPostCategoryType, PostList } from '@/features/post'
import { FC } from 'react'

const PostLibraryList: FC = () => {
  return <PostList postCategoryType={EnumPostCategoryType['LIBRARY']} />
}

export default PostLibraryList
