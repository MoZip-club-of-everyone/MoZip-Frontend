"use client";

// 담당자: 나영
// Figma : 모집폼 관리 > 상단 세개의 탭을 관리하는 파일입니다.
// /mozipFormCreate의 page.tsx에서 현재 표시하고 있는 컴포넌트의 옆에 파란별을 띄워 표시합니다.

import styled from "styled-components";
import CustomFont from "@/components/CustomFont";
import CustomRow from "@/components/CustomRow";
import StyledImg from "@/components/StyledImg";
import { IoIosArrowForward } from "react-icons/io";
import React from "react";

const CustomTabs = styled(CustomRow)`
  padding-top: 3rem;
`;

// activeTab의 타입을 string으로, setActiveTab의 타입을 React.Dispatch로 지정
interface MozipTabsProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const tabs = ["서류 관리", "면접 관리", "합불 관리"];

export default function MozipManageTabs({
  activeTab,
  setActiveTab,
}: MozipTabsProps) {
  return (
    <CustomTabs
      $width="100%"
      $alignitems="center"
      $justifycontent="flex-start"
      $gap="1rem"
    >
      {tabs.map((tab, index) => (
        <React.Fragment key={tab}>
          <CustomRow
            $width="auto"
            $alignitems="center"
            $justifycontent="center"
            $gap="0.5rem"
            onClick={() => setActiveTab(tab)}
          >
            <CustomFont $color="black" $font="1.2rem" $fontweight="bold">
              {tab}
            </CustomFont>
            {activeTab === tab && (
              <StyledImg
                src={"/icon_TabStar.png"}
                $width="1rem"
                $height="1rem"
              />
            )}
          </CustomRow>
          {index < tabs.length - 1 && <IoIosArrowForward />}
        </React.Fragment>
      ))}
    </CustomTabs>
  );
}
