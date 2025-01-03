"use client";

// 담당자: 현아 -> 나영
// 홈화면에 기본으로 렌더링되는 홈 컴포넌트입니다.

import CustomColumn from "@/components/CustomColumn";
import CustomCard from "../components/CustomCard";
import AddClubButton from "../components/AddClubButton";
import styled from "styled-components";

const clubs = [
  {
    imageSrc: "path/to/image1.jpg",
    name: "최대 15글자까지 보이는 동아리명최대 15글자",
    details: ["관리자: 김강민", "3개의 모집폼"],
  },
  {
    imageSrc: "path/to/image2.jpg",
    name: "다른 동아리명",
    details: ["관리자: 김영희", "5개의 모집폼"],
  },
  {
    imageSrc: "path/to/image3.jpg",
    name: "세 번째 동아리",
    details: ["관리자: 이철수", "2개의 모집폼"],
  },
  {
    imageSrc: "path/to/image4.jpg",
    name: "네 번째 동아리",
    details: ["관리자: 박민지", "1개의 모집폼"],
  },
  {
    imageSrc: "path/to/image5.jpg",
    name: "다섯 번째 동아리",
    details: ["관리자: 최현우", "4개의 모집폼"],
  },
];

const Layout = styled.div`
  max-width: 80%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
`;
const AddContainer = styled.div`
  padding: 1rem;
`

interface ClubProps {
  setActiveTab: (tab: string) => void;
}

export default function Club({ setActiveTab }: ClubProps) {
  // 최대 6개까지만 표시 (임시로)
  const displayedClubs = clubs.slice(0, 6);
  const shouldShowAddButton = displayedClubs.length < 6;

  return (
    <CustomColumn $width="100%" $alignitems="center" $justifycontent="center">
      <Layout>
        {displayedClubs.map((club, index) => (
          <CustomCard
            key={index}
            imageSrc={club.imageSrc}
            clubName={club.name}
            clubDetails={club.details}
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
