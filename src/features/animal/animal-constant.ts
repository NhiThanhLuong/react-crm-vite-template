import { SETUP_PATH } from '@/data/constant'

export const ANIMAL_PATH = '/animals'
export const ANIMAL_NAME = 'đối tượng'

export const ANIMAL_BREADCRUMBS = {
  list: [
    {
      title: `Thiết lập ${ANIMAL_NAME}`,
    },
  ],
  listPath: {
    title: `Thiết lập ${ANIMAL_NAME}`,
    url: SETUP_PATH + ANIMAL_PATH,
  },
  detail: () => [
    ANIMAL_BREADCRUMBS.listPath,
    {
      title: `Chi tiết ${ANIMAL_NAME}`,
    },
  ],
}
