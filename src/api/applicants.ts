import {
  ReadPaperApplicantsForMozipData,
  ReadPaperApplicationsForMozipData,
} from "./applicants.type";
import axiosInstance, { isTest } from "./axiosInstance";

/**
 * 지원자 생성
 */
export async function createApplicantForMozip() {
  if (isTest) {
    return {
      applicant_id: "01F8Z5D5D5D5D5D5D5D1",
      realname: "재웅이",
      phone: "010-0000-0000",
      email: "email@example.com",
      is_answer_exist: false,
    };
  }
  return {};
}

/**
 * 지원자 필수 정보 조회
 */
export async function readApplicantRequiredInfoForMozip() {
  if (isTest) {
    return {
      applicant_id: "01F8Z5D5D5D5D5D5D5D1",
      realname: "재웅이",
      phone: "010-0000-0000",
      email: "email@example.com",
      is_answer_exist: true,
    };
  }
  return {};
}

/**
 * 서류 지원자 목록 조회
 */
export const getReadPaperApplicantsForMozip = async (
  mozipId: string
): Promise<ReadPaperApplicantsForMozipData | null> => {
  try {
    const response = await axiosInstance.get(`/mozip/${mozipId}/applications`);
    const data = response.data;

    // 배열이면 첫 번째 요소만 반환, 아니면 그대로 반환
    return Array.isArray(data) && data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("API 요청 실패:", error);
    throw error;
  }
};




/**
 * 서류 지원서 목록 조회
 */

export const getReadPaperApplicationsForMozip = async (
  mozipId: string,
  selectedApplicant?: string,
  selectedQuestion?: string
): Promise<ReadPaperApplicationsForMozipData[]> => {
  try {
    const response = await axiosInstance.get(`/mozip/${mozipId}/applications`, {
      params: {
        applicant: selectedApplicant,
        question: selectedQuestion,
      },
    });

    const data = response.data;
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error("API 요청 실패:", error);
    throw error;
  }
};



/**
 * 서류 평가 점수 목록 조회
 */
export async function readPaperEvaluationScoresForMozip() {
  if (isTest) {
    return {
      total_cnt: 4,
      passed_cnt: 2,
      failed_cnt: 2,
      applicants: [
        {
          applicant_id: "01F8Z5D5D5D5D5D5D5D1",
          application_number: 12345,
          realname: "홍길동",
          email: "honggildong@example.com",
          phone: "010-1234-5678",
          evaluations: [
            {
              evaluation_id: "01F8Z5D5D5D5D5D5D5D2",
              realname: "김평가자",
              score: 85,
            },
            {
              evaluation_id: "01F8Z5D5D5D5D5D5D5D3",
              realname: "이평가자",
              score: 88,
            },
          ],
          paper_score_average: 86.5,
          paper_score_standard_deviation: 1.5,
          paper_status: "합격",
        },
        {
          applicant_id: "01F8Z5D5D5D5D5D5D5D4",
          application_number: 12346,
          realname: "이순신",
          email: "leesunshin@example.com",
          phone: "010-9876-5432",
          evaluations: [
            {
              evaluation_id: "01F8Z5D5D5D5D5D5D5D5",
              realname: "박평가자",
              score: 78,
            },
            {
              evaluation_id: "01F8Z5D5D5D5D5D5D5D6",
              realname: "최평가자",
              score: 75,
            },
          ],
          paper_score_average: 76.5,
          paper_score_standard_deviation: 2.0,
          paper_status: "불합격",
        },
      ],
    };
  }
  return {};
}

/**
 * 서류 합격자 목록 조회
 */
export async function readPaperPassedApplicantsForMozip() {
  if (isTest) {
    return {
      total_cnt: 3,
      passed_cnt: 3,
      failed_cnt: 0,
      applicants: [
        {
          applicant_id: "01F8Z5D5D5D5D5D5D5D1",
          application_number: 12345,
          realname: "홍길동",
          applied_at: "2023-10-01T10:00:00",
          email: "honggildong@example.com",
          phone: "010-1234-5678",
          paper_score_average: 85.0,
          interview_score_average: 90.0,
          interview_status: "합격",
        },
        {
          applicant_id: "01F8Z5D5D5D5D5D5D5D2",
          application_number: 12346,
          realname: "이순신",
          applied_at: "2023-10-01T10:05:00",
          email: "leesunshin@example.com",
          phone: "010-9876-5432",
          paper_score_average: 88.0,
          interview_score_average: 92.0,
          interview_status: "합격",
        },
        {
          applicant_id: "01F8Z5D5D5D5D5D5D5D3",
          application_number: 12347,
          realname: "김철수",
          applied_at: "2023-10-01T10:10:00",
          email: "kimchulsoo@example.com",
          phone: "010-1111-2222",
          paper_score_average: 80.0,
          interview_score_average: 85.0,
          interview_status: "합격",
        },
      ],
    };
  }
  return {};
}

/**
 * 면접 기록 목록 조회
 */
export async function readInterviewRecordsForMozip() {
  if (isTest) {
    return {
      questions: [
        {
          question_id: "01F8Z8D8F8G8H8J8K8L8M8N8Q1",
          question: "면접 질문 내용",
          answers: [
            {
              applicant_id: "01F8Z8D8F8G8H8J8K8L8M8N8O8",
              realname: "홍길동",
              answer: "면접 답변 내용",
              score: 88,
            },
            {
              applicant_id: "01F8Z8D8F8G8H8J8K8L8M8N8O9",
              realname: "김철수",
              answer: "면접 답변 내용2",
              score: 90,
            },
          ],
        },
        {
          question_id: "01F8Z8D8F8G8H8J8K8L8M8N8Q2",
          question: "면접 질문 내용2",
          answers: [
            {
              applicant_id: "01F8Z8D8F8G8H8J8K8L8M8N8O8",
              realname: "홍길동",
              answer: "면접 답변 내용3",
              score: 85,
            },
            {
              applicant_id: "01F8Z8D8F8G8H8J8K8L8M8N8O9",
              realname: "김철수",
              answer: "면접 답변 내용4",
              score: 92,
            },
          ],
        },
      ],
    };
  }
  return {};
}

/**
 * 면접 평가 점수 목록 조회
 */
export async function readInterviewEvaluationScoresForMozip() {
  if (isTest) {
    return {
      questions: [
        {
          question_id: "01F8Z8D8F8G8H8J8K8L8M8N8Q1",
          question: "면접 질문 내용",
          answers: [
            {
              applicant_id: "01F8Z8D8F8G8H8J8K8L8M8N8O8",
              realname: "홍길동",
              answer: "면접 답변 내용",
              score: 88,
            },
            {
              applicant_id: "01F8Z8D8F8G8H8J8K8L8M8N8O9",
              realname: "김철수",
              answer: "면접 답변 내용2",
              score: 90,
            },
          ],
        },
        {
          question_id: "01F8Z8D8F8G8H8J8K8L8M8N8Q2",
          question: "면접 질문 내용2",
          answers: [
            {
              applicant_id: "01F8Z8D8F8G8H8J8K8L8M8N8O8",
              realname: "홍길동",
              answer: "면접 답변 내용3",
              score: 85,
            },
            {
              applicant_id: "01F8Z8D8F8G8H8J8K8L8M8N8O9",
              realname: "김철수",
              answer: "면접 답변 내용4",
              score: 92,
            },
          ],
        },
      ],
    };
  }
  return {};
}
