import axiosInstance, { isTest } from "./axiosInstance";

/**
 * 특정 모집의 모든 서류질문 조회
 */

export async function readPaperQuestionsForMozip(mozip_id: string) {
  if (isTest) {
    return {
      list: [
        {
          mozip_id: "3",
          question_id: "01F8Z5D5D5D5D5D5D5D1",
          question: "왜 들어오고 싶나요?",
          details: "지원 동기를 설명해주세요.",
          type: "LONG_ANSWER",
          isRequired: true,
        },
        {
          mozip_id: "3",
          question_id: "01F8Z5D5D5D5D5D5D5D2",
          question: "지원파트가 뭔가요?",
          details: "지원할 파트를 선택해주세요.",
          type: "ONE_CHOICE",
          isRequired: false,
        },
      ],
    };
  }

  try {
    const response = axiosInstance.get(`/api/questions?mozip_id=${mozip_id}`);
    return (await response).data;
  } catch (e) {
    console.error(e);
  }
}

/**
 * 특정 서류질문 조회
 */
export async function readPaperQuestion() {
  if (isTest) {
    return {};
  }
  return {};
}

/**
 * 특정 모집에 서류질문 추가
 */
export async function createPaperQuestionForMozip() {
  if (isTest) {
    return {};
  }
  return {};
}

/**
 * 특정 서류질문 수정
 */
export async function updatePaperQuestion() {
  if (isTest) {
    return {};
  }
  return {};
}

/**
 * 특정 서류질문 삭제
 */
export async function deletePaperQuestion() {
  if (isTest) {
    return {};
  }
  return {};
}
