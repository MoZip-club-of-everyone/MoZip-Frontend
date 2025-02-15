import axiosInstance from "../axiosInstance";

interface Request {
    phone: string;
    code: string;
}
interface Response {
    email: string;
}

export default async function deleteIdCodeCheck(data: Request) {
    try{
        const response = await axiosInstance.delete<Response>(`api/users/certification-number/id`, {
            data: data 
        });
        console.log("아이디 인증번호 확인 완료:", response)
        return response.data;
    } catch (error) {
        console.error("아이디 인증번호 확인 실패: ", error);
        throw error;
    }
}  