import { EnumPostCategoryType, PostDetail } from '@/features/post'
import { FC } from 'react'

const PostLibraryDetail: FC = () => {
  return <PostDetail postCategoryType={EnumPostCategoryType['LIBRARY']} />
}

export default PostLibraryDetail
