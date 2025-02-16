import axiosInstance from "../axiosInstance";

interface Request {
    name: string;
    phone: string;
}

export default async function postCodeSend(data: Request) {
    try{
        const response = await axiosInstance.post(`api/users/certification-number`, data);
        console.log("휴대폰 인증 번호 발송 성공:", response)
        return response.data;
    } catch (error) {
        console.error("휴대폰 인증 번호 발송 실패: ", error);
        throw error;
    }
}  