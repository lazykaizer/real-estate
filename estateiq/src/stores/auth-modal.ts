import { create } from 'zustand'

type AuthModalStore = {
    isOpen: boolean
    redirectUrl: string | null
    openModal: (redirectUrl?: string) => void
    closeModal: () => void
}

export const useAuthModalStore = create<AuthModalStore>((set) => ({
    isOpen: false,
    redirectUrl: null,
    openModal: (redirectUrl = null) => set({ isOpen: true, redirectUrl }),
    closeModal: () => set({ isOpen: false, redirectUrl: null }),
}))
