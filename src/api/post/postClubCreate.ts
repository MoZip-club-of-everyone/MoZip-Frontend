import axios from "axios";

export default async function postClubCreate(image: File, name: string,) {
  try {
    const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    const userId = localStorage.getItem("userId");

    if (!userId) {
      throw new Error("userId가 없습니다.");
    }
    if (!accessToken) {
      throw new Error("accessToken이 없습니다.");
    }

    console.log("동아리 만드는 유저는:", userId);
    console.log("동아리 만드는 유저 토큰은:", accessToken);

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("image", image);
    formData.append("name", name);

    console.log("서버로 전송할 데이터:");
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/clubs`, formData, {
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("클럽 생성 실패:", error.message || error);
    throw error;
  }
}
