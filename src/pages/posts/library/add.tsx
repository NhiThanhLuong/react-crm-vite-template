import { EnumPostCategoryType, PostAdd } from '@/features/post'
import { FC } from 'react'

const PostLibraryAdd: FC = () => {
  return <PostAdd postCategoryType={EnumPostCategoryType['LIBRARY']} />
}

export default PostLibraryAdd
