"use client";

// import { useRecoilValue } from "recoil";
// import { loginState } from "@/recoil/loginState";
import { useLoginStore } from "@/stores/useLoginStore";
import CustomColumn from "@/components/CustomColumn";
import CustomCard from "../components/CustomCard";
import AddClubButton from "../components/AddClubButton";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

const Layout = styled.div`
  max-width: 80%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
`;

const AddContainer = styled.div`
  padding: 1rem;
`;

const MessageContainer = styled.div`
  font-size: 1.5rem;
  color: #555;
  text-align: center;
  margin-top: 2rem;
`;

interface ClubProps {
  setActiveTab: (tab: string) => void; // 탭 변경 함수
}

interface ClubData {
  club_id: string;
  name: string;
  image: Blob | string | null;
  master_name: string;
  mozip_count: number;
}

export default function Club({ setActiveTab }: ClubProps) {
  const [clubs, setClubs] = useState<ClubData[]>([]);
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리!
  //const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState); // Recoil 상태 사용
  // const loginStateValue = useRecoilValue(loginState);
  const { isLoggedIn, userId } = useLoginStore();
  const shouldShowAddButton = clubs.length < 6;

  // useEffect(() => {
  //   const checkLoginStatus = () => {
  //     const userId = localStorage.getItem("userId");
  //     const accessToken = localStorage.getItem("accessToken");
  //     // setIsLoggedIn(!!userId && !!accessToken); // 로그인 상태 확인
  //     setIsLoggedIn({
  //       isLoggedIn: !!userId && !!accessToken,
  //       userId: userId || null, // userId도 상태로 관리
  //     });
  //   };

  //   const fetchClubs = async () => {
  //     try {
  //       const userId = localStorage.getItem("userId");
  //       const accessToken = localStorage.getItem("accessToken");

  //       if (!userId || !accessToken) {
  //         console.error("로그인되지 않았습니다.");
  //         return;
  //       }

  //       const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/clubs/user/${userId}`, {
  //         headers: {
  //           Authorization: `${accessToken}`,
  //         },
  //       });
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (!userId || !accessToken) {
          console.error("로그인되지 않았습니다.");
          return;
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/clubs/user/${userId}`,
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );

        const baseUrl = "https://mozip-bucket.s3.amazonaws.com"; //s3 서버 주소

        const clubData = await Promise.all(
          response.data.map(async (club: any) => {
            const imageUrl = `${baseUrl}/${club.image}`;
            try {
              const imageResponse = await fetch(imageUrl);
              if (!imageResponse.ok) throw new Error("이미지 요청 실패");
              const imageBlob = await imageResponse.blob();
              return {
                ...club,
                image: imageBlob,
              };
            } catch (error) {
              console.warn(`이미지 요청 실패: ${imageUrl}`, error);
              return {
                ...club,
                image: imageUrl,
              };
            }
          })
        );

        setClubs(clubData.filter((club) => club !== null)); // null 데이터 필터링
      } catch (error) {
        console.error("클럽 데이터를 가져오는 중 오류 발생:", error);
      }
    };
    if (isLoggedIn) {
      fetchClubs();
    }
  }, [isLoggedIn, userId]);

  //   checkLoginStatus(); // 로그인 됐는가?
  //   fetchClubs(); // 동아리 데이터 가져오기
  // }, [setIsLoggedIn]); // setIsLoggedIn 변경 시 useEffect 다시 실행

  const handleClubClick = (clubId: string) => {
    localStorage.setItem("selectedClubId", clubId); // club_id 저장
    setActiveTab("모집"); // 탭 변경
  };

  if (!isLoggedIn) {
    return (
      <MessageContainer>
        로그인 후 나의 모든 동아리를 확인하세요.
      </MessageContainer>
    );
  }

  return (
    <CustomColumn $width="100%" $alignitems="center" $justifycontent="center">
      <Layout>
        {clubs.map((club) => (
          <CustomCard
            key={club.club_id}
            imageSrc={
              club.image instanceof Blob
                ? URL.createObjectURL(club.image)
                : typeof club.image === "string"
                  ? club.image
                  : ""
            }
            clubName={club.name}
            clubDetails={[`관리자: ${club.master_name}`, `${club.mozip_count}개의 모집폼`]}
            onClick={() => handleClubClick(club.club_id)}
          />
        ))}
        <AddContainer>
          {shouldShowAddButton && <AddClubButton key="add-club" />}
        </AddContainer>
      </Layout>
    </CustomColumn>
  );
}
