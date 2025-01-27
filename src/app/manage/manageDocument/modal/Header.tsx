import React from "react";
import styled from "styled-components";

export default function Header() {
  return (
    <HeaderWrapper>
      <Title>지원서 평가</Title>
      <SubHeaderWrapper>
        <SubHeaderDiv>
          <SubHeaderGroup>
            <SubHeaderTitle>지원자</SubHeaderTitle>
            <DropBox>
              <option value="김강민">김강민</option>
              <option value="이예림">이예림</option>
              <option value="홍길동">홍길동</option>
            </DropBox>
          </SubHeaderGroup>
          <SubHeaderGroup>
            <SubHeaderTitle>문항 번호</SubHeaderTitle>
            <DropBox>
              <option value="1번 문항">1번 문항</option>
              <option value="2번 문항">2번 문항</option>
              <option value="3번 문항">3번 문항</option>
            </DropBox>
          </SubHeaderGroup>
        </SubHeaderDiv>
        <SubHeaderDiv>
          <SubHeaderGroup>
            <SubComment>지원자에 대한 평가 점수를 입력해주세요.</SubComment>
            <ScoreSection>
              <ScoreInput type="text" placeholder="100점" />
              <ScoreButton>점수 입력</ScoreButton>
            </ScoreSection>
          </SubHeaderGroup>
        </SubHeaderDiv>
      </SubHeaderWrapper>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

const SubHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
`;

const SubHeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const SubHeaderGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SubHeaderTitle = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
`;

const DropBox = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  color: #333;
  background-color: white;
`;

const SubComment = styled.p`
  font-size: 14px;
  color: #666;
`;

const ScoreSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
`;

const ScoreInput = styled.input`
  width: 80px;
  height: 32px;
  padding: 4px;
  font-size: 14px;
  text-align: center;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 6px;
`;

const ScoreButton = styled.button`
  padding: 4px 12px;
  font-size: 14px;
  color: white;
  background-color: #5296ff;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #4078d6;
  }
`;
