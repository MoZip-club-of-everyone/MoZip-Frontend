// import axios from "axios";

// const axiosInstance = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
//     // baseURL: `http://${process.env.NEXT_PUBLIC_SERVER_URL}`,
//     timeout: 500000, // 5000ms = 5초
// });

// export default axiosInstance;

import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { useRouter } from "next/router";

// 토큰 관련 함수
// const getAccessToken = (): string | null => sessionStorage.getItem("accessToken");
// const getRefreshToken = (): string | null => sessionStorage.getItem("refreshToken");
// const setAccessToken = (token: string): void => sessionStorage.setItem("accessToken", token);
// const clearTokens = (): void => {
//   sessionStorage.removeItem("accessToken");
//   sessionStorage.removeItem("refreshToken");
// };

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  timeout: 5000, // 5초
});

// 요청 인터셉터
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const accessToken = getAccessToken();
//     if (accessToken && config.headers) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error: AxiosError) => Promise.reject(error)
// );

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

