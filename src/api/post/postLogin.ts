// import axiosInstance from "../axiosInstance";

// interface LoginData {
//     email: string;
//     password: string;
// }

// export default async function postLogin(data: LoginData) {
//     try {
//         const response = await axiosInstance.post(`/api/users/login`, data);
//         const accessToken = response.data.access_token;
//         const userId = response.data.user_id;
//         console.log('로그인 된 유저', userId);

//         localStorage.setItem("accessToken", accessToken);
//         localStorage.setItem("userId", userId);
//         return response.data;
//     } catch (error) {
//         console.error("로그인 요청 실패: ", error);
//         throw error;
//     }
// }

import axiosInstance from "../axiosInstance";

interface LoginData {
    email: string;
    password: string;
}

interface LoginResponse {
    access_token: string;
    user_id: string;
    // 기타 response.data에 포함된 다른 필드들
}

export default async function postLogin(data: LoginData) {
    try {
        const response = await axiosInstance.post<LoginResponse>(`/api/users/login`, data);
        console.log('로그인 된 유저', response.data.user_id);
        
        // localStorage 저장은 useLoginStore에서 처리하도록 이동
        return {
            accessToken: response.data.access_token,
            userId: response.data.user_id,
            // 필요한 경우 다른 데이터도 반환
        };
    } catch (error) {
        console.error("로그인 요청 실패: ", error);
        throw error;
    }
}