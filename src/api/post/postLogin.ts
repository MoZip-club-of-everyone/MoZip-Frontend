import axiosInstance from "../axiosInstance";

interface LoginData {
    email: string;
    password: string;
}

export default async function postLogin(data: LoginData) {
    try {
        const response = await axiosInstance.post(`/api/users/login`, data);
        const accessToken = response.data.access_token;
        const userId = response.data.user_id;
        console.log('로그인 된 유저', userId);

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userId", userId);
        return response.data;
    } catch (error) {
        console.error("로그인 요청 실패: ", error);
        throw error;
    }
}