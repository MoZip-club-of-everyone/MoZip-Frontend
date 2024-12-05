import axiosInstance from "../axiosInstance";

interface LoginData {
    username: string;
    password: string;
}

export default async function postLogin(data: LoginData) {
    try {
        const response = await axiosInstance.post(`/api/users/login`, data);
        return response.data;
    } catch (error) {
        console.error("로그인 요청 실패: ", error);
        throw error;
    }
}