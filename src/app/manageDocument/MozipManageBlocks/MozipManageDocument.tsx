import React, { useState } from "react";
import MozipManageDocumentList from "../MozipManageDocuments/MozipManageDocumentList";
import MozipManageDocumentsView from "../MozipManageDocuments/MozipManageDocumentsView";
import MozipManageDocumentsScore from "../MozipManageDocuments/MozipManageDocumentsScore";
import CustomColumn from "@/components/CustomColumn";
import CustomRow from "@/components/CustomRow";
import styled from "styled-components";

const HeaderBtnWapper = styled.div`
  width: 309px;
  border: 1px solid #f1f1f1;
  border-radius: 12px;
  padding: 5px;
  background-color: #eef1f7;
  display: flex;
  flex-direction: row;
  gap: 0.5em;
`;

const HeaderButton = styled.div<{ isSelected: boolean }>`
  width: 98.5px;
  font-size: 12px;
  padding: 8px 16px;
  background-color: ${({ isSelected }) => (isSelected ? "#5296ff" : "#eef1f7")};
  color: ${({ isSelected }) => (isSelected ? "white" : "#363636")};
  border-radius: 4px;
  cursor: pointer;
  font-weight: ${({ isSelected }) => (isSelected ? "bold" : "medium")};
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${({ isSelected }) =>
      isSelected ? "#5296ff" : "#dce3f2"};
    color: ${({ isSelected }) => (isSelected ? "white" : "#4077cc")};
  }
`;

interface ManageDocumentProps {
  onNext: () => void;
}

export default function MozipManageDocument({ onNext }: ManageDocumentProps) {
  const [selectedPage, setSelectedPage] = useState<string>("list");

  const renderContent = () => {
    switch (selectedPage) {
      case "list":
        return <MozipManageDocumentList />;
      case "view":
        return <MozipManageDocumentsView />;
      case "score":
        return <MozipManageDocumentsScore />;
      default:
        return null;
    }
  };

  return (
    <CustomColumn
      $width="100%"
      $alignitems="flex-start"
      $justifycontent="flex-start"
      $gap="0px"
    >
      <CustomRow
        $width="100%"
        $alignitems="center"
        $justifycontent="center"
        $padding="1rem"
      >
        <HeaderBtnWapper>
          <HeaderButton
            isSelected={selectedPage === "list"}
            onClick={() => setSelectedPage("list")}
          >
            지원자 목록
          </HeaderButton>
          <HeaderButton
            isSelected={selectedPage === "view"}
            onClick={() => setSelectedPage("view")}
          >
            지원서 보기
          </HeaderButton>
          <HeaderButton
            isSelected={selectedPage === "score"}
            onClick={() => setSelectedPage("score")}
          >
            평가점수
          </HeaderButton>
        </HeaderBtnWapper>
      </CustomRow>
      <CustomRow
        $width="100%"
        $alignitems="flex-start"
        $justifycontent="flex-start"
        $padding="1rem"
      >
        {renderContent()}
      </CustomRow>
    </CustomColumn>
  );
}
