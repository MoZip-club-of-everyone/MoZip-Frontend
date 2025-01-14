import axiosInstance from "../axiosInstance";

// interface ClubData {
//   name: string;
//   image: File;
// }

export default async function postClubCreate(data: FormData) {
  try {
    const token = localStorage.getItem("token"); // 토큰 가져오기
    console.log("토큰 확인:", token); // 토큰 값 출력
    if (!token) throw new Error("토큰이 없습니다.");

    const response = await axiosInstance.post(`/api/clubs`, data, {
      headers: {
        Authorization: `${token}`, // Authorization 헤더 추가
        "Content-Type": "multipart/form-data", // FormData 전송을 위한 Content-Type 지정
      },
    });

    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("클럽 생성 실패: ", error);
    throw error; // 오류 처리를 호출자에게 전달하기 위해 throw 사용
  } 
}