import axiosInstance, { isTest } from "./axiosInstance";
import { updatePaperStatusType } from "./evaluation.type";

/**
 * 서류 합불 상태 수정
 */
export const updatePaperStatus = async (
  data: updatePaperStatusType
): Promise<updatePaperStatusType> => {
  if (isTest) {
    return {
      applicants: [
        {
          applicant_id: "01F8Z8D8F8G8H8J8K8L8M8N8O8",
          status: "합격", // PASSED
        },
        {
          applicant_id: "01F8Z8D8F8G8H8J8K8L8M8N8O9",
          status: "불합격", // FAILED
        },
      ],
    };
  } else {
    console.log("서류 지원서 상태 업데이트 함수 실행됨");
    try {
      const response = await axiosInstance.put<updatePaperStatusType>(
        `/applicants/papers/status`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("서류 지원서 상태 업데이트 API 요청 실패:", error);
      throw error;
    }
  }
};

/**
 * 면접 합불 상태 수정
 */
export async function updateInterviewStatus() {
  if (isTest) {
    return {};
  }
  return {};
}

/**
 * 특정 서류 응답 평가 조회
 */
export async function readPaperAnswerEvaluation() {
  if (isTest) {
    return {
      applicantName: "홍길동",
      paperScore: 85,
      questionNo: 1,
      question: "자기소개를 해주세요.",
      answer: "안녕하세요, 저는 홍길동입니다.",
      comments: [
        {
          comment: "좋은 대답입니다.",
          writer: "김철수",
          date: "2023-10-01T10:00:00",
        },
        {
          comment: "조금 더 구체적으로 설명해 주세요.",
          writer: "이영희",
          date: "2023-10-01T11:00:00",
        },
      ],
      memos: [
        {
          memo: "면접관의 인상은 좋았다.",
          writer: "김철수",
          date: "2023-10-01T10:30:00",
        },
        {
          memo: "추가 질문 필요.",
          writer: "이영희",
          date: "2023-10-01T11:15:00",
        },
      ],
    };
  }
  return {};
}

/**
 * 서류 점수 입력
 */
export async function patchPaperAnswerScore() {
  if (isTest) {
    return {
      score: 90,
    };
  }
  return {};
}

/**
 * 서류 코멘트 작성
 */
export async function createPaperAnswerComment() {
  if (isTest) {
    return {
      comment: "코멘트어쩌구",
    };
  }
  return {};
}

/**
 * 서류 코멘트 수정
 */
export async function updatePaperAnswerComment() {
  if (isTest) {
    return {
      comment: "코멘트어쩌구",
    };
  }
  return {};
}

/**
 * 서류 코멘트 삭제
 */
export async function deletePaperAnswerComment() {
  if (isTest) {
    return {};
  }
  return {};
}

/**
 * 서류 메모 작성
 */
export async function createPaperAnswerMemo() {
  if (isTest) {
    return {
      memo: "추가 메모입니다.",
    };
  }
  return {};
}

/**
 * 서류 메모 수정
 */
export async function updatePaperAnswerMemo() {
  if (isTest) {
    return {};
  }
  return {};
}

/**
 * 서류 메모 삭제
 */
export async function deletePaperAnswerMemo() {
  if (isTest) {
    return {};
  }
  return {};
}

/**
 * 특정 면접 기록 평가 조회
 */
export async function readInterviewAnswerEvaluation() {
  if (isTest) {
    return {
      applicantName: "이순신",
      interviewScore: 92,
      questionNo: 1,
      question: "어떤 경험이 가장 기억에 남나요?",
      answer: "전투에서의 경험이 가장 기억에 남습니다.",
      comments: [
        {
          comment: "훌륭한 대답입니다.",
          writer: "박지성",
          date: "2023-10-01T12:00:00",
        },
        {
          comment: "더 많은 사례를 들어주세요.",
          writer: "최강희",
          date: "2023-10-01T12:30:00",
        },
      ],
      memos: [
        {
          memo: "면접관의 반응이 좋았다.",
          writer: "박지성",
          date: "2023-10-01T12:15:00",
        },
        {
          memo: "추가 질문 필요.",
          writer: "최강희",
          date: "2023-10-01T12:45:00",
        },
      ],
    };
  }
  return {};
}
