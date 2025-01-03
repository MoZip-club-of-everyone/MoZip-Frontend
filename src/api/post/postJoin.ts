import axiosInstance from "../axiosInstance";

interface JoinData {
  password: string;
  realname: string;
  email: string;
  phone: string;
}

export default async function postJoin(data: JoinData) {
  try {
      const response = await axiosInstance.post(`/api/users/join`, data);
      // console.log(response.data);
      return response.data;
  } catch (error) {
    console.error("회원가입 요청 실패: ", error);
    throw error; // 오류 처리를 호출자에게 전달하기 위해 throw 사용
  }
}

// import axiosInstance from "../axiosInstance";

// interface JoinData {
//     username: string;
//     password: string;
//     realname: string;
//     email: string;
//     phone: string;
//   }

// export default async function postJoin({
//     username,
//     password,
//     realname,
//     email,
//     phone,
//   }: JoinData) {
//     try {
//         const response = await axiosInstance.post(
//             `/api/users/join/`,
//             {
//                 username: username,
//                 password: password,
//                 realname: realname,
//                 email: email,
//                 phone: phone
//             }
//         )
//         console.log(response)
//         return response.data;
//     } catch (error) {
//       console.error("회원가입 요청 실패:", error);
//       throw error; // 오류 처리를 호출자에게 전달하기 위해 throw 사용
//     }
// }