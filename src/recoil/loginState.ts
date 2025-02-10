import { atom } from "recoil";

// 로그인 상태 타입 정의
interface LoginState {
  isLoggedIn: boolean;
  userId: string | null;
}

// Recoil atom 정의
export const loginState = atom<LoginState>({
  key: "loginState", // 고유한 key 값
  default: {
    isLoggedIn: false, // 로그인 여부
    userId: null, // 사용자 ID (없으면 null)
  },
});
