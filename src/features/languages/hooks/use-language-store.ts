import { getLocalStorage } from '@/utils'
import { create } from 'zustand'
import { Languages } from '../services/types'

type LanguageStore = {
  currentLanguage: Languages
  setCurrentLanguage: (_lang: Languages) => void
}

const useLanguageStore = create<LanguageStore>()((set) => ({
  currentLanguage: getLocalStorage('lang') || 'vi',
  setCurrentLanguage: (lang) => {
    set({
      currentLanguage: lang,
    })
  },
}))

export default useLanguageStore
