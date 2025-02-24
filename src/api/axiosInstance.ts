// import axios from "axios";

// const axiosInstance = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
//     // baseURL: `http://${process.env.NEXT_PUBLIC_SERVER_URL}`,
//     timeout: 500000, // 5000ms = 5초
// });

// export default axiosInstance;

import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { useRouter } from "next/router";

export const isTest = true

// 토큰 관련 함수
const getAccessToken = (): string | null => localStorage.getItem("accessToken");
const getRefreshToken = (): string | null =>
  localStorage.getItem("refreshToken");
const setAccessToken = (token: string): void =>
  localStorage.setItem("accessToken", token);
const clearTokens = (): void => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  timeout: 5000, // 5초
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    console.log('토큰:', accessToken);
    console.log("Access Token:", accessToken); // 토큰 값 확인(변수명accessToken을 저장 시(postLogin.ts참고)의 변수명과 동일하게 맞춰야함.)

    //회원가입 요청은 accessToken을 추가하지 않음
    if (config.url?.includes("/users/join")) {
      console.log("회원가입 요청 - Authorization 헤더 제외");
      return config;
    }

    if (accessToken && config.headers) {
      config.headers.Authorization = `${accessToken}`; //`Bearer ${accessToken}` 원래는 이건데 이번에는 백에서 Bearer를 붙여서 줘서 뺌
      console.log("Authorization 헤더:", config.headers.Authorization);
    }
    console.log("config 확인:", config);
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// 응답 인터셉터
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError) => {
//     const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
//     const router = useRouter();

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true; // 중복 처리 방지
//       const refreshToken = getRefreshToken();

//       if (refreshToken) {
//         try {
//           const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/refresh`, {
//             refreshToken,
//           });

//           setAccessToken(data.accessToken);
//           if (originalRequest.headers) {
//             originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
//           }

//           return axiosInstance(originalRequest); // 갱신된 토큰으로 요청 재시도
//         } catch (refreshError) {
//           console.error("토큰 갱신 실패:", refreshError);
//           clearTokens();
//           router.push("/memberlogin"); // 로그인 페이지로 리디렉션
//         }
//       } else {
//         clearTokens();
//         router.push("/memberlogin"); // 리프레시 토큰 없음: 로그아웃 처리
//       }
//     }

//     return Promise.reject(error); // 다른 에러는 그대로 반환
//   }
// );

export default axiosInstance;
