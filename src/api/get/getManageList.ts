import axiosInstance from "../axiosInstance";

interface Response {
    realname_and_phone: string;
    position_name: string;
    user_id: string;
}

export default async function getManageList(club_id: string) {
    try{
        const response = await axiosInstance.get<Response[]>(`api/clubs/${club_id}/manage`)
        return response.data;
        // return {
        //     realName: response.data.realname,
        //     positionName: response.data.position_name
        // }
    } catch (error) {
        console.error("특정 동아리의 운영진 목록 리스트 가져오기 실패: ", error);
        throw error;
    }
}  