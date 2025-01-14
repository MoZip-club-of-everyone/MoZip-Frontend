import axiosInstance from "../axiosInstance";

interface LoginData {
    email: string;
    password: string;
}

export default async function postLogin(data: LoginData) {
    try {
        const response = await axiosInstance.post(`/api/users/login`, data);
        const accessToken = response.data.access_token; // 서버에서 전달된 토큰
        localStorage.setItem("accessToken", accessToken); // 로컬 스토리지에 저장(따옴표 안에 쓴 말로 저장됨.)
        return response.data;
    } catch (error) {
        console.error("로그인 요청 실패: ", error);
        throw error;
    }
}