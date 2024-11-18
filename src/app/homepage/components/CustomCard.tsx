// CustomCard.tsx
"use client";

import styled from "styled-components";
import CustomImage from "./CustomImage";
import CustomInformation from "./CustomInformation";
import CustomButton from "@/components/CustomButton";

interface CustomCardProps {
  width?: string;
  imageSrc?: string;
  clubName?: string;
  clubDetails?: string[]; //details를 배열로 받음
  children?: React.ReactNode;
  onClick?: () => void;
}

const CardContainer = styled.div`
  width: auto;
  overflow: hidden;
  padding: 1rem;
  cursor: pointer;
`;

export default function CustomCard({ imageSrc, clubName, clubDetails, onClick }: CustomCardProps) {
  return (
    <CardContainer onClick={onClick}>
      <CustomImage src={imageSrc} />
      <CustomInformation name={clubName} details={clubDetails} />
      {/* <CustomInformation name={'최대열다섯글자최대열다섯글자최대'} details={["관리자: 김강민", "3개의 모집폼"]} /> */}
    </CardContainer>
  );
};

