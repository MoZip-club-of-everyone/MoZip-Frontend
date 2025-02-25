"use client";

// 담당자: 현아
// Figma : 홈 > 상단 두개의 탭을 관리하는 파일입니다.
// /homepage의 page.tsx에서 현재 표시하고 있는 컴포넌트의 옆에 파란별을 띄워 표시합니다.

import styled from "styled-components";
import CustomFont from "@/components/CustomFont";
import CustomRow from "@/components/CustomRow";
import StyledImg from "@/components/StyledImg";
import { IoIosArrowForward } from "react-icons/io";
import CustomColumn from "@/components/CustomColumn";
import CustomDivider from "@/components/CustomDivider";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineUserPlus } from "react-icons/hi2";
import { useState, useEffect } from "react";
import ExecutiveManagementModal from "./modal/ExecutiveManagementModal";
import ClubEditModal from "./modal/ClubEditModal";
import { usePositionStore } from '@/stores/usePositionStore'; 

const CustomTabs = styled(CustomRow)`
  padding-top: 3rem;
`;

// activeTab의 타입을 string으로, setActiveTab의 타입을 React.Dispatch로 지정
interface MozipTabsProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export default function HomeTabs({ activeTab, setActiveTab }: MozipTabsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClubModalOpen, setIsClubModalOpen] = useState(false);
  const [selectedClubName, setSelectedClubName] = useState<string>("");
  const { position, hasPermission } = usePositionStore();

  useEffect(() => {
    const clubName = localStorage.getItem("selectedClubName");
    console.log("localStorage에서 가져온 clubName:", clubName);
    if (clubName) {
      setSelectedClubName(clubName);
    }
  }, [activeTab]); 
  
  // 관리 버튼을 표시할지 결정하는 함수
  const shouldShowManagementButtons = () => {
    if (!position) return false;
    return hasPermission('관리'); // '관리' 권한(레벨 3) 이상만 버튼이 보이도록 설정
  };

  return (
    <CustomColumn
      $width="80%"
      $gap="1rem"
      $alignitems="center"
      $justifycontent="center"
    >
      <CustomTabs
        $width="100%"
        $alignitems="center"
        $justifycontent="space-between"
        $gap="1rem"
      >
        <BtnsLeft>
          <CustomRow
            $width="auto"
            $alignitems="center"
            $justifycontent="center"
            $gap="0.5rem"
          >
            <CustomFont $color="black" $font="1.2rem" $fontweight="bold">
              동아리
              {activeTab === "모집" && selectedClubName && (
                <CustomFont  $color="black" $font="1rem" $fontweight="bold">
                  {` [${selectedClubName}]`}
                </CustomFont>
              )}
            </CustomFont>
            {activeTab === "동아리" && (
              <StyledImg
                src={"/icon_TabStar.png"}
                $width="1rem"
                $height="1rem"
              />
            )}
          </CustomRow>
          <IoIosArrowForward />
          <CustomRow
            $width="auto"
            $alignitems="center"
            $justifycontent="center"
            $gap="0.5rem"
          >
            <CustomFont $color="black" $font="1.2rem" $fontweight="bold">
              모집
            </CustomFont>
            {activeTab === "모집" && (
              <StyledImg
                src={"/icon_TabStar.png"}
                $width="1rem"
                $height="1rem"
              />
            )}
          </CustomRow>
        </BtnsLeft>
        {activeTab === "모집" && (
          <BtnsRight>
            { shouldShowManagementButtons() && (
              <CheckButton onClick={() => setIsClubModalOpen(true)}>
                <IoSettingsOutline />
                동아리 관리
              </CheckButton>
            )}
            <CheckButton onClick={() => setIsModalOpen(true)}>
              <HiOutlineUserPlus />
              운영진 관리
            </CheckButton>
          </BtnsRight>
        )}
      </CustomTabs>

      <CustomDivider $width="100%" $height="1px" $backgroundcolor="#D8D8D8" />
      {isModalOpen && (
        <ExecutiveManagementModal onClose={() => setIsModalOpen(false)} />
      )}
      {isClubModalOpen && (
        <ClubEditModal onClose={() => setIsClubModalOpen(false)} />
      )}
    </CustomColumn>
  );
}

const CheckButton = styled.div`
  display: flex;
  border: 1px solid #464646;
  padding: 3px 5px;
  border-radius: 4px;
  align-items: center;
  gap: 0.5rem;
  font-size: 12px;
  &:hover {
    cursor: pointer;
  }
`;

const BtnsLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BtnsRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
