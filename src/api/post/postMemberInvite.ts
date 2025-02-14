import axiosInstance from "../axiosInstance";

interface Request {
    email: string;
}

export default async function postMemberInvite(club_id: string, data: Request) {
    try{
      const response = await axiosInstance.post(`api/clubs/${club_id}/invite`, data)
      return response.data;
    } catch (error) {
        console.error("운영진 초대 실패: ", error);
        throw error;
    }
}

// 응답 메시지 추가 버전
// import axiosInstance from "../axiosInstance";

// interface Request {
//     email: string;
// }

// interface Response {
//     message: string;
// }

// export default async function postMemberInvite(club_id: number, data: Request) {
//     try {
//         const response = await axiosInstance.post<Response>(
//             `api/clubs/${club_id}/invite`, 
//             data
//         );
//         console.log("초대 성공:", response.data.message); // 여기에 콘솔 추가
//         return response.data;
//     } catch (error) {
//         console.error("운영진 초대 실패: ", error);
//         throw error;
//     }
// }