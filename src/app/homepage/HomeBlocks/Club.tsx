"use client";

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
  const shouldShowAddButton = clubs.length < 6;

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const accessToken = localStorage.getItem("accessToken");

        if (!userId) {
          console.error("userId가 없습니다.");
          return;
        }

        if (!accessToken) {
          console.error("accessToken이 없습니다.");
          return;
        }

        // API 요청 및 응답 데이터 확인
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/clubs/user/${userId}`, {
          headers: {
            Authorization: `${accessToken}`,
          },
        });

        const baseUrl = "https://mozip-bucket.s3.amazonaws.com";

        const clubData = await Promise.all(
          response.data.map(async (club: any) => {
            console.log("클럽 데이터:", club);

            if (!club.club_id) {
              console.warn("club_id가 없습니다. 데이터 구조를 확인하세요.", club);
              return null;
            }

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

    fetchClubs();
  }, []);

  // 클릭 시 localStorage에 club_id 저장
  const handleClubClick = (clubId: string) => {
    localStorage.setItem("selectedClubId", clubId);
    setActiveTab("모집");
  };

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
