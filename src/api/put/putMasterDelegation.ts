import axiosInstance from "../axiosInstance";

interface Request {
    userId: string;
    positionName: string;
}

export default async function putMasterDelegation(club_id: string, data: Request) {
    try{
        const response = await axiosInstance.put(`api/clubs/${club_id}/position/master`, data)
        console.log("마스터 권한 위임 성공: ", response)
        return response.data;
    } catch (error) {
        console.error("마스터 권한 위임 실패: ", error);
        throw error;
    }
}