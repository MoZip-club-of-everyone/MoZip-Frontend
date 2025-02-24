import CustomColumn from "@/components/CustomColumn";
import CustomFont from "@/components/CustomFont";
import styled from "styled-components";
import { useEffect, useState } from "react";
import CommentModal from "../CommentModal";
import CustomRow from "@/components/CustomRow";
import Dropdown from "./Dropdown";
import { ReadPaperApplicationsForMozipData } from "@/api/applicants.type";
import { getReadPaperApplicationsForMozip } from "@/api/applicants";
import { ReadPaperApplications } from "@/api/applicants.type";
import { ApplicantsResponse } from "@/api/applicants.type";
import { getReadPaperApplicantsForMozip } from "@/api/applicants";
import axiosInstance from "@/api/axiosInstance";

export default function View(): JSX.Element {
  const [score, setScore] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [paperData, setPaperData] = useState<
    ReadPaperApplicationsForMozipData[]
  >([]);
  const [selectedApplicant, setSelectedApplicant] = useState<string>("");
  const [selectedQuestion, setSelectedQuestion] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedApplicants, setSelectedApplicants] = useState<string[]>([]);
  const [applicantsData, setApplicantsData] = useState<ReadPaperApplications[]>([]);
  const mozipId = localStorage.getItem("mozipId");

  // 드롭다운 내부 지원자 목록 전부 가져와서 출력하기
  const fetchData = async () => {
    try {
      console.log("지원자 목록 API 요청 시작...");
      const response = await axiosInstance.get<ApplicantsResponse>(`/api/mozip/${mozipId}/applicants/papers`);
      console.log("지원자 목록 API 응답:", response.data);

      // applicants 배열로 상태 업데이트
      setApplicantsData(response.data.applicants);

    } catch (error) {
      console.error("서류 지원자 목록 조회 API 요청 실패:", error);
      setApplicantsData([]); // 오류 발생 시 빈 배열로 초기화
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchPaperData = async () => {
      try {
        const data = await getReadPaperApplicationsForMozip(
          mozipId || "",
          selectedApplicant || undefined,
          selectedQuestion || undefined
        );
        setPaperData(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch paper data:", error);
      }
    };

    fetchPaperData();
  }, [selectedApplicant, selectedQuestion]);


  const applicants =
    applicantsData.map((applicant) => ({
      id: applicant.applicant_id,
      label: applicant.realname,
      checked: applicant.applicant_id === selectedApplicant,
    })) || [];

  // 문항 목록 생성
  const questions =
    paperData.map((question) => ({
      id: question.question_id,
      label: question.question,
      checked: question.question_id === selectedQuestion,
    })) || [];

  const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScore(e.target.value);
  };

  const handleScoreSubmit = () => {
    alert(`점수 입력: ${score}`);
  };

  const handleCommentClick = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleApplicantSelect = (applicantId: string) => {
    setSelectedApplicant(applicantId);
  };

  const handleQuestionSelect = (questionId: string) => {
    setSelectedQuestion(questionId);
  };

  // 현재 선택된 질문과 답변 찾기
  const currentQuestion = paperData.find(
    (q) => q.question_id === selectedQuestion || !selectedQuestion
  );
  const currentAnswer = currentQuestion?.answers.find(
    (a) => a.applicant_id === selectedApplicant
  );

  return (
    <CustomColumn $width="100%" $alignitems="flex-start" $gap="16px">
      <CustomFont $font="24px" $color="#363636" $fontweight="bold">
        서류 지원서 보기
      </CustomFont>
      <CustomRow>
        <Dropdown
          title="조회할 지원자"
          options={applicants}
          searchable
          onOpen={fetchData}
          onSelect={handleApplicantSelect}
        />
        <Dropdown
          title="문항별 응답조회"
          options={questions}
          searchable={false}
        // onSelect={handleQuestionSelect}
        />
      </CustomRow>
      {currentQuestion && currentAnswer && (
        <>
          <QuestionWrapper>
            <Question>{currentQuestion.question}</Question>
          </QuestionWrapper>
          <AnswerWapper>
            <AnswerName>{currentAnswer.realname}</AnswerName>
            <AnswerDiv>{currentAnswer.answer}</AnswerDiv>
            <ScoreInput
              type="text"
              value={score}
              onChange={handleScoreChange}
              placeholder="100점"
            />
            <ScoreButton onClick={handleScoreSubmit}>점수 입력</ScoreButton>
            <CommentButton onClick={handleCommentClick}>
              평가 코멘트
            </CommentButton>
          </AnswerWapper>
        </>
      )}
      {isModalOpen && (
        <CommentModal isOpen={isModalOpen} onClose={closeModal} />
      )}
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