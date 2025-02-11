// import { create } from 'zustand'

// interface LoginState {
//   isLoggedIn: boolean
//   userId: string | null
//   setLogin: (isLoggedIn: boolean, userId: string | null) => void
//   logout: () => void
// }

// export const useLoginStore = create<LoginState>((set) => ({
//   isLoggedIn: false,
//   userId: null,
//   setLogin: (isLoggedIn, userId) => set({ isLoggedIn, userId }),
//   logout: () => set({ isLoggedIn: false, userId: null })
// }))
import { create } from 'zustand'

interface LoginState {
  isLoggedIn: boolean
  userId: string | null
  setLogin: (userId: string, accessToken: string) => void
  logout: () => void
}

export const useLoginStore = create<LoginState>((set) => ({
  isLoggedIn: false,
  userId: null,
  setLogin: (userId, accessToken) => {
    localStorage.setItem('userId', userId);
    localStorage.setItem('accessToken', accessToken);
    set({ isLoggedIn: true, userId });
  },
  logout: () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('accessToken');
    set({ isLoggedIn: false, userId: null });
  }
}))