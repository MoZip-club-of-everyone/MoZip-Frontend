import { isTest } from "./axiosInstance";

/**
 * 특정 질문의 모든 선택지 조회
 */
export async function readPaperChoicesForQuestion() {
  if (isTest) {
    return {
      choices: [
        {
          choiceId: 301,
          content: "개발",
        },
        {
          choiceId: 302,
          content: "프론트",
        },
        {
          choiceId: 303,
          content: "백엔드",
        },
      ],
    };
  }
  return {};
}

/**
 * 특정 질문에 선택지 추가
 */
export async function createPaperChoiceForQuestion() {
  if (isTest) {
    return {
      choiceId: 301,
      content: "개발",
    };
  }
  return {};
}

/**
 * 특정 질문에 선택지 일괄 추가
 */
export async function createBulkPaperChoicesForQuestion() {
  if (isTest) {
    return {
      choices: [
        {
          choice: "개발",
        },
        {
          choice: "프론트",
        },
        {
          choice: "백엔드",
        },
      ],
    };
  }
  return {};
}

/**
 * 특정 선택지 조회
 */
export async function readPaperChoice() {
  if (isTest) {
    return {
      choice_id: 301,
      content: "개발",
    };
  }
  return {};
}

/**
 * 특정 선택지 수정
 */
export async function updatePaperChoice() {
  if (isTest) {
    return {
      choice_id: 301,
      choice: "개발",
    };
  }
  return {};
}

/**
 * 특정 선택지들 일괄 수정
 */
export async function updateBulkPaperChoices() {
  if (isTest) {
    return {
      choices: [
        {
          choiceId: 301,
          content: "개발",
        },
        {
          choiceId: 302,
          content: "프론트",
        },
        {
          choiceId: 303,
          content: "백엔드",
        },
      ],
    };
  }
  return {};
}

/**
 * 특정 선택지 삭제
 */
export async function deletePaperChoice() {
  if (isTest) {
    return {};
  }
  return {};
}
