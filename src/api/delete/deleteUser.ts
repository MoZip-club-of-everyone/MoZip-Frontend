import axiosInstance from "../axiosInstance";

interface Request {
    // realname: string;
    userId: string;
}

export default async function deleteUser(club_id: string, data: Request) {
    try{
        const response = await axiosInstance.delete(`api/clubs/${club_id}/position`, {
            data: data 
        });
        console.log("특정 동아리의 사용자 추방: ", response)
        return response.data;
    } catch (error) {
        console.error("특정 동아리의 사용자 추방 실패: ", error);
        throw error;
    }
}  