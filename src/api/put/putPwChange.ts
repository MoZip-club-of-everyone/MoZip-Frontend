import axiosInstance from "../axiosInstance";

interface Request {
    userId: string;
    password: string;
}

export default async function putPwChange(data: Request) {
    try{
        const response = await axiosInstance.put(`api/users/password`, data)
        console.log("비밀번호 변경 완료: ", response)
        return response.data;
    } catch (error) {
        console.error("비밀번호 변경 실패: ", error);
        throw error;
    }
}