import axiosInstance from "../axiosInstance";

interface Request {
    realname: string;
    positionName: string;
}

export default async function putUserPosition(club_id: string, data: Request) {
    try{
        const response = await axiosInstance.put(`api/clubs/${club_id}/position`, data)
        console.log("역할 변경한 운영진: ", response)
        return response.data;
    } catch (error) {
        console.error("특정 동아리의 사용자 역할 부여 실패: ", error);
        throw error;
    }
}