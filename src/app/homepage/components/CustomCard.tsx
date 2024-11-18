// CustomCard.tsx
"use client";

import styled from "styled-components";
import CustomImage from "./CustomImage";
import CustomInformation from "./CustomInformation";

interface CustomCardProps {
  imageSrc?: string;
  clubName?: string;
  clubDetails?: string[]; //details를 배열로 받음
  children?: React.ReactNode;
}

const CardContainer = styled.div`
  width: 260px;
  /* border: 1px solid #ddd; */
  /* border-radius: 20px; */
  overflow: hidden;

`;

export default function CustomCard ({ imageSrc, clubName, clubDetails }: CustomCardProps) {
  return (
    <CardContainer>
      <CustomImage src={imageSrc} />
      <CustomInformation name={clubName} details={clubDetails} />
      {/* <CustomInformation name={'최대열다섯글자최대열다섯글자최대'} details={["관리자: 김강민", "3개의 모집폼"]} /> */}
    </CardContainer>
  );
};

