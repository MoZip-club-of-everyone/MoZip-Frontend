import CustomColumn from "@/components/CustomColumn";
import CustomFont from "@/components/CustomFont";
import styled from "styled-components";
import { useState } from "react";
import CommentModal from "../CommentModal";
import CustomRow from "@/components/CustomRow";
import Dropdown from "./Dropdown";

const QuestionWrapper = styled.div`
  width: 100%;
  padding: 16px;
  background-color: #f9f9f9;
  border-left: 7px solid #5296ff;
`;

const Question = styled.p`
  font-size: 16px;
  color: #363636;
  line-height: 1.5;
`;

const AnswerWapper = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
`;

const AnswerName = styled.div`
  font-size: 16px;
  width: 100px;
  display: flex;
  justify-content: center;
`;

const AnswerDiv = styled.div`
  width: 100%;
  padding: 16px;
  border-left: 7px solid #5296ff;
`;

const ScoreInput = styled.input`
  width: 59px;
  height: 24px;
  padding: 4px;
  font-size: 12px;
  position: absolute;
  bottom: 20px;
  right: 80px;
  text-align: center;
  color: #999;
  border-radius: 4px;
  border: 1px solid #999;
`;

const ScoreButton = styled.button`
  width: 59px;
  height: 24px;
  font-size: 12px;
  position: absolute;
  bottom: 20px;
  right: 22.5px;
  color: white;
  background-color: #5296ff;
  border: none;
  border-radius: 4px;
`;

const CommentButton = styled.button`
  width: 89px;
  height: 26px;
  border-radius: 4px;
  font-size: 12px;
  border: 1px solid #ccc;
  cursor: pointer;
`;

export default function View(): JSX.Element {
  const [score, setScore] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScore(e.target.value);
  };

  const handleScoreSubmit = () => {
    alert(`점수 입력: ${score}`);
  };

  const handleCommentClick = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const applicants = [
    { id: "김강민", label: "김강민", checked: true },
    { id: "임승민", label: "임승민", checked: true },
    { id: "이나영", label: "이나영", checked: false },
    { id: "이예림", label: "이예림", checked: true },
  ];

  const questions = [
    { id: "전체", label: "전체", checked: true },
    { id: "1번 문항", label: "1번 문항", checked: true },
    { id: "2번 문항", label: "2번 문항", checked: true },
    { id: "3번 문항", label: "3번 문항", checked: false },
  ];

  return (
    <CustomColumn $width="100%" $alignitems="flex-start" $gap="16px">
      <CustomFont $font="24px" $color="#363636" $fontweight="bold">
        서류 지원서 보기
      </CustomFont>
      <CustomRow>
        <Dropdown title="조회할 지원자" options={applicants} searchable />
        <Dropdown
          title="문항별 응답조회"
          options={questions}
          searchable={false}
        />
      </CustomRow>
      <QuestionWrapper>
        <Question>IT동아리 지원 이유를 작성해주세요.</Question>
      </QuestionWrapper>
      <AnswerWapper>
        <AnswerName>김강민</AnswerName>
        <AnswerDiv>프로젝트 경험을 쌓고 싶습니다.</AnswerDiv>
        <ScoreInput
          type="text"
          value={score}
          onChange={handleScoreChange}
          placeholder="100점"
        />
        <ScoreButton onClick={handleScoreSubmit}>점수 입력</ScoreButton>
        <CommentButton onClick={handleCommentClick}>평가 코멘트</CommentButton>
      </AnswerWapper>
      {isModalOpen && (
        <CommentModal isOpen={isModalOpen} onClose={closeModal} />
      )}
    </CustomColumn>
  );
}
