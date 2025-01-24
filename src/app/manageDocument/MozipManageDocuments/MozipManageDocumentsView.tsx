import { useEffect, useState } from "react";
import { fetchQuestions } from "@/api/post/fetchQuestionGET";

import CustomColumn from "@/components/CustomColumn";
import CustomFont from "@/components/CustomFont";
import styled from "styled-components";

interface Answer {
  applicant_id: string;
  realname: string;
  answer: string;
  score: number;
}

interface Question {
  question_id: string;
  question_content: string;
  answers: Answer[];
}

export default function MozipManageDocumentsView(): JSX.Element {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [score, setScore] = useState("");

  useEffect(() => {
    async function loadQuestions() {
      try {
        const mozipId = "01F8MECHZX3TBDSZ7W3D5B9FQ9"; // 일단 mockData로 정의해둠!
        const data = await fetchQuestions(mozipId);
        setQuestions(data.questions);
      } catch (error) {
        console.error("서류지원서 목록 조회 실패: ", error);
      }
    }

    loadQuestions();
  }, []);

  const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScore(e.target.value);
  };

  const handleScoreSubmit = () => {
    alert(`점수 입력: ${score}`);
  };

  const handleCommentClick = () => {
    alert("평가 코멘트를 입력하세요.");
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

      {questions.map((question) => (
        <div key={question.question_id}>
          <QuestionWrapper>
            <Question>{question.question_content}</Question>
          </QuestionWrapper>

          {question.answers.map((answer) => (
            <AnswerWapper key={answer.applicant_id}>
              <AnswerName>{answer.realname}</AnswerName>
              <AnswerDiv>{answer.answer}</AnswerDiv>
              <ScoreInput
                type="text"
                value={score}
                onChange={handleScoreChange}
                placeholder="100점"
              />
              <ScoreButton onClick={handleScoreSubmit}>점수 입력</ScoreButton>
              <CommentButton onClick={handleCommentClick}>평가 코멘트</CommentButton>
            </AnswerWapper>
          ))}
        </div>
      ))}
    </CustomColumn>
  );
}

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