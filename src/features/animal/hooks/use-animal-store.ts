import { create } from 'zustand'

type AnimalStore = {
  productGroupModal?: number | 'add'
  setProductGroupModal: (productGroupModal?: number | 'add') => void
}

const useAnimalStore = create<AnimalStore>()((set) => ({
  setProductGroupModal: (productGroupModal) =>
    set({
      productGroupModal,
    }),
}))

export default useAnimalStore
