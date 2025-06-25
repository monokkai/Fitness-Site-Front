import { create } from 'zustand'
import { useUserStore } from './userStore'

type AuthGuardStore = {
  isPopupOpen: boolean
  openPopup: () => void
  closePopup: () => void
  checkAuth: () => boolean
}

export const useAuthGuardStore = create<AuthGuardStore>((set, get) => ({
  isPopupOpen: false,
  openPopup: () => set({ isPopupOpen: true }),
  closePopup: () => set({ isPopupOpen: false }),
  checkAuth: () => {
    const { user } = useUserStore.getState()
    if (!user) {
      get().openPopup()
      return false
    }
    return true
  }
}))