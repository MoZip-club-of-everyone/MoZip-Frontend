import axiosInstance from "../axiosInstance";

interface Request {
    phone: string;
    code: string;
};

interface Response {
    user_id: string;
    access_token: string;
};

export default async function deletePwCodeCheck(data: Request): Promise<Response> {
    try{
        const response = await axiosInstance.delete(`api/users/certfication-number/password`, {
            data: data 
        });
        console.log("비밀번호 인증번호 확인 완료:", response)
        return response.data;
    } catch (error) {
        console.error("비밀번호 인증번호 확인 실패: ", error);
        throw error;
    }
}

// export default async function deletePwCodeCheck(data: Request) {
//     try{
//         const response = await axiosInstance.delete<Response>(`api/users/certfication-number/password`, {
//             data: data 
//         });
//         console.log("비밀번호 인증번호 확인 완료:", response)
//         return response.data;
//     } catch (error) {
//         console.error("비밀번호 인증번호 확인 실패: ", error);
//         throw error;
//     }
// }  