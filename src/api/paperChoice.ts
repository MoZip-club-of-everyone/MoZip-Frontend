import { isTest } from "./axiosInstance";

/**
 * 특정 질문의 모든 선택지 조회
 */
export async function readPaperChoicesForQuestion() {
	if (isTest) {
		return {};
	}
	return {};
}

/**
 * 특정 질문에 선택지 추가
 */
export async function createPaperChoiceForQuestion() {
	if (isTest) {
		return {};
	}
	return {};
}

/**
 * 특정 질문에 선택지 일괄 추가
 */
export async function createBulkPaperChoicesForQuestion() {
	if (isTest) {
		return {};
	}
	return {};
}

/**
 * 특정 선택지 조회
 */
export async function readPaperChoice() {
	if (isTest) {
		return {};
	}
	return {};
}

/**
 * 특정 선택지 수정
 */
export async function updatePaperChoice() {
	if (isTest) {
		return {};
	}
	return {};
}

/**
 * 특정 선택지들 일괄 수정
 */
export async function updateBulkPaperChoices() {
	if (isTest) {
		return {};
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