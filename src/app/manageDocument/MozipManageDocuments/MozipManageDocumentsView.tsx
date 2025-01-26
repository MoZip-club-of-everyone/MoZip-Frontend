import CustomColumn from "@/components/CustomColumn";
import CustomFont from "@/components/CustomFont";
import styled from "styled-components";
import { SetStateAction, useState } from "react";
import CommentModal from "./modalComponent/CommentModal";

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
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
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
  margin-right: 16px;
  font-size: 12px;
  position: absolute;
  bottom: 20px;
  right: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #999999;
  border-radius: 4px;
  border: 1px solid #999999;
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

export default function MozipManageDocumentsView(): JSX.Element {
  const [score, setScore] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가

  const handleScoreChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setScore(e.target.value);
  };

  const handleScoreSubmit = () => {
    alert(`점수 입력: ${score}`);
  };

  const handleCommentClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <CustomColumn
      $width="100%"
      $alignitems="flex-start"
      $justifycontent="flex-start"
      $gap="16px"
    >
      <CustomFont $font="24px" $color="#363636" $fontweight="bold">
        서류 지원서 보기
      </CustomFont>

      <QuestionWrapper>
        <Question>
          다양한 IT동아리 중에서 멋쟁이사자처럼 대학 11기 활동에 지원하게 된
          이유를 작성해주세요. (500자 이내)
        </Question>
      </QuestionWrapper>

      <AnswerWapper>
        <AnswerName>김강민</AnswerName>
        <AnswerDiv>
          저는 이 동아리에서 최대한 프로젝트 경험을 쌓고 싶습니다. 제가 개발
          동아리를 찾게 된 이유이기도 한데, 개발자로서의 기본은 프로젝트를 통한
          협업의 경험과 이에 대한 능력이라고 생각하기 때문입니다. 저는 최대한
          다양한 프로젝트를 수행하며, 유의미한 결과를 도출해내고 싶습니다. 개발
          지식을 갖추는 것은 책이나 유튜브를 보며 실습하는 것으로도 가능하지만,
          제가 원하는 지식은 팀 프로젝트 내에서 제가 어떤 역할을 수행해야 하고,
          어떻게 프로젝트를 진행해야 하는 지에 대한, 쉽게 얻지 못할 경험입니다.
          부디 제가 이러한 질적 경험을 얻을 수 있도록 해주시면 감사하겠습니다.
        </AnswerDiv>
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
