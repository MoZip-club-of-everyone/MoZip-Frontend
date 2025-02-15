import axiosInstance from "../axiosInstance";

interface Request {
    userId: string;
    password: string;
}

export default async function putUserPosition(data: Request) {
    try{
        const response = await axiosInstance.put(`api/users/password`, data)
        console.log("역할 변경한 운영진: ", response)
        return response.data;
    } catch (error) {
        console.error("특정 동아리의 사용자 역할 부여 실패: ", error);
        throw error;
    }
}