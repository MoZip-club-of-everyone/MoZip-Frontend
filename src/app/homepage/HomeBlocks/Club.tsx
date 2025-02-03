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
  setActiveTab: (tab: string) => void;
}

interface ClubData {
  club_id: string;
  name: string;
  image: Blob | string | null; // string을 허용하여 이미지 경로 지원
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
          console.error("userId가 없습니다. 로그인 여부를 확인하세요.");
          return;
        }

        if (!accessToken) {
          console.error("accessToken이 없습니다. 인증 상태를 확인하세요.");
          return;
        }

        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/clubs/user/${userId}`, {
          headers: {
            Authorization: `${accessToken}`,
          },
        });

        const baseUrl = 'https://mozip-bucket.s3.amazonaws.com';

        const clubData = await Promise.all(
          response.data.map(async (club: any) => {
            const imageUrl = `${baseUrl}/${club.image}`;
            try {
              const imageResponse = await fetch(imageUrl);
              if (!imageResponse.ok) throw new Error("이미지 요청 실패");
              const imageBlob = await imageResponse.blob();
              return {
                ...club,
                image: imageBlob, // Blob 데이터 저장
              };
            } catch (error) {
              console.warn(`이미지 요청 실패. 기본 URL 사용: ${imageUrl}`, error);
              return {
                ...club,
                image: imageUrl, // 요청 실패 시 URL 그대로 저장
              };
            }
          })
        );

        setClubs(clubData);
      } catch (error) {
        console.error("클럽 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchClubs();
  }, []);

  return (
    <CustomColumn $width="100%" $alignitems="center" $justifycontent="center">
      <Layout>
        {clubs.map((club) => (
          <CustomCard
            key={club.club_id}
            imageSrc={
              club.image instanceof Blob
                ? URL.createObjectURL(club.image) // Blob 객체를 URL로 변환
                : typeof club.image === "string"
                  ? club.image // 이미지 경로로 렌더링
                  : "" // 이미지가 없을 경우 빈 값
            }
            clubName={club.name}
            clubDetails={[`관리자: ${club.master_name}`, `${club.mozip_count}개의 모집폼`]}
            onClick={() => setActiveTab("모집")}
          />
        ))}
        <AddContainer>
          {shouldShowAddButton && <AddClubButton key="add-club" />}
        </AddContainer>
      </Layout>
    </CustomColumn>
  );
}
