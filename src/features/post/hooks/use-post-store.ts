import { create } from 'zustand'
import { EnumPostRelatedModal } from '../services/enums'

type PostStore = {
  modalType?: EnumPostRelatedModal
  setModal: (modalType?: EnumPostRelatedModal) => void
}

const usePostStore = create<PostStore>()((set) => ({
  setModal: (modalType) =>
    set({
      modalType,
    }),
}))

export default usePostStore
