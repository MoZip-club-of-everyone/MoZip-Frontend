import { isTest } from "./axiosInstance";

/**
 * 특정 지원자의 모든 서류응답 조회
 */
export async function readPaperAnswersForApplicant() {
  if (isTest) {
    return {
      list: [
        {
          applicantId: "123",
          questionId: "101",
          answer: "열심히 하고 싶습니다!",
        },
        {
          applicantId: "123",
          questionId: "102",
          answer: "백엔드 개발",
        },
      ],
    };
  }
  return {};
}

/**
 * 특정 서류질문에 대한 모든 서류응답 조회
 */
export async function readPaperAnswersForQuestion() {
  if (isTest) {
    return {
      list: [
        {
          applicantId: "123",
          questionId: "101",
          answer: "열심히 하고 싶습니다!",
        },
        {
          applicantId: "456",
          questionId: "101",
          answer: "배우고 싶어서 지원했습니다.",
        },
      ],
    };
  }
  return {};
}

/**
 * 특정 지원자의 특정 서류질문에 대한 서류응답 조회
 */
export async function readPaperAnswerForApplicantAndQuestion() {
  if (isTest) {
    return {
      applicantId: "123",
      questionId: "101",
      answer: "열심히 하고 싶습니다!",
    };
  }
  return {};
}

/**
 * 특정 서류응답 조회
 */
export async function readPaperAnswer() {
  if (isTest) {
    return {
      applicantId: "123",
      questionId: "101",
      answer: "열심히 하고 싶습니다!",
    };
  }
  return {};
}

/**
 * 서류응답 추가
 */
export async function createPaperAnswer() {
  if (isTest) {
    return {
      applicantId: "123",
      questionId: "101",
      answer: "열심히 하고 싶습니다!",
    };
  }
  return {};
}

/**
 * 특정 서류응답 수정
 */
export async function updatePaperAnswer() {
  if (isTest) {
    return {
      applicantId: "123",
      questionId: "101",
      answer: "더욱 성실하게 참여하고 싶습니다!",
    };
  }
  return {};
}

/**
 * 특정 서류응답 삭제
 */
export async function deletePaperAnswer() {
  if (isTest) {
    return {};
  }
  return {};
}

/**
 * 서류 응답 작성 완료
 */
export async function registerPaperAnswersForApplicant() {
  if (isTest) {
    return {};
  }
  return {};
}
