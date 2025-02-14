"use client";

// 담당자: 현아
// 동아리 정보 컴포넌트

import styled from "styled-components";
import CustomBox from "@/components/CustomBox";
import { BsDot } from "react-icons/bs";

interface CustomInformationProps {
  name?: string;
  details?: string[]; //details를 배열로 받음
}

const CustomBoxWithShadow = styled(CustomBox)`
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1);
	border-radius: 1rem;
	padding: 1rem;
  width: 20rem;
  height: auto;
  border-radius: 20px;
  overflow: hidden;
  padding: 24px;
  margin-top: 22px;
  background-color: white;
`;

const ClubName = styled.div`
  font-weight: bold;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #5B5B5B;
  text-align: left;
`;

const DetailsContainer = styled.div`
  margin-top: 8px;
  text-align: left;
  width: 100%;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 11px;
  color: #5B5B5B;
`;

export default function CustomInformation({ name, details }: CustomInformationProps) {
  return (
    <CustomBoxWithShadow>
      <ClubName>{name}</ClubName>
      <DetailsContainer>
        {details?.map((detail, index) => (
          <DetailItem key={index}>
            <BsDot style={{ fontSize: "11px", color: "#5B5B5B" }} />
            {detail}
          </DetailItem>
        ))}
      </DetailsContainer>
    </CustomBoxWithShadow>
  );
};

