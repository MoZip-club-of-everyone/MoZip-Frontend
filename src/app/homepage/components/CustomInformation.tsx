"use client";

// 담당자: 현아
// 동아리 정보 컴포넌트

import styled from "styled-components";
import { BsDot } from "react-icons/bs";

interface CustomInformationProps {
  name?: string;
  details?: string[]; //details를 배열로 받음
}

const InformationContainer = styled.div`
  padding: 24px;
  margin-top: 22px;
  width: 260px;
  height: 96px;
  border-radius: 20px;
  box-shadow: 0 0px 16px #DDDDDD;
  overflow: hidden;
`;

const ClubName = styled.div`
  font-weight: bold;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #5B5B5B;
  text-align: left;
  /* max-width: 15ch; */
`;

const DetailsContainer = styled.div`
  margin-top: 8px;
  text-align: left; /* 왼쪽 정렬 */
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 11px;
  color: #5B5B5B;
`;

export default function CustomInformation({ name, details }: CustomInformationProps) {
  return (
    <InformationContainer>
      <ClubName>{name}</ClubName>
      <DetailsContainer>
        {details?.map((detail, index) => (
          <DetailItem key={index}>
            <BsDot style={{ fontSize: "11px", color: "#5B5B5B" }} /> {/* 아이콘 추가 */}
            {detail}
          </DetailItem>
        ))}
      </DetailsContainer>
    </InformationContainer>
  );
};

