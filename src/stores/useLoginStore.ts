import { create } from 'zustand'
import { persist, createJSONStorage } from "zustand/middleware";

interface LoginState {
  isLoggedIn: boolean
  userId: string | null
  setLogin: (userId: string, accessToken: string) => void
  logout: () => void
}

export const useLoginStore = create(
  persist<LoginState>(
    (set) => ({
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
}),
{
  name: 'login-storage', // localStorage에 저장될 키 이름
  storage: createJSONStorage(() => localStorage), // storage 엔진 설정
  // 선택적으로 특정 상태만 유지하고 싶다면:
  // partialize: (state) => ({ isLoggedIn: state.isLoggedIn, userId: state.userId })
}
)
);

// 수정 전
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