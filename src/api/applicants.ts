import { isTest } from "./axiosInstance";

/**
 * 지원자 생성
 */
export async function createApplicantForMozip() {
	if (isTest) {
		return {};
	}
	return {};
}

/**
 * 지원자 필수 정보 조회
 */
export async function readApplicantRequiredInfoForMozip() {
	if (isTest) {
		return {
			"applicant_id": "01F8Z5D5D5D5D5D5D5D1",
			"realname": "재웅이",
			"phone": "010-0000-0000",
			"email": "email@example.com",
			"is_answer_exist": true
		};
	}
	return {};
}

/**
 * 서류 지원자 목록 조회 - 예림이 
 */
export async function readPaperApplicantsForMozip() {
	if (isTest) {
		return {
			"total_cnt": 5,
			"passed_cnt": 3,
			"failed_cnt": 2,
			"applicants": [
				{
					"applicant_id": "01F8Z5D5D5D5D5D5D5D1",
					"application_number": 12345,
					"realname": "홍길동",
					"applied_at": "2023-10-01T10:00:00",
					"email": "honggildong@example.com",
					"phone": "010-1234-5678",
					"paper_score_average": 85.0,
					"paper_score_standard_deviation": 1.5,
					"paper_status": "합격"
				},
				{
					"applicant_id": "01F8Z5D5D5D5D5D5D5D2",
					"application_number": 12346,
					"realname": "이순신",
					"applied_at": "2023-10-01T10:05:00",
					"email": "leesunshin@example.com",
					"phone": "010-9876-5432",
					"paper_score_average": 88.0,
					"paper_score_standard_deviation": 2.0,
					"paper_status": "불합격"
				},
				{
					"applicant_id": "01F8Z5D5D5D5D5D5D5D3",
					"application_number": 12347,
					"realname": "김철수",
					"applied_at": "2023-10-01T10:10:00",
					"email": "kimchulsoo@example.com",
					"phone": "010-1111-2222",
					"paper_score_average": 80.0,
					"paper_score_standard_deviation": 1.0,
					"paper_status": "평가 중"
				}
			]
		};
	}
	return {};
}

/**
 * 서류 지원서 목록 조회
 */
export async function readPaperApplicationsForMozip() {
	if (isTest) {
		return {};
	}
	return {};
}

/**
 * 서류 평가 점수 목록 조회
 */
export async function readPaperEvaluationScoresForMozip() {
	if (isTest) {
		return {};
	}
	return {};
}

/**
 * 서류 합격자 목록 조회
 */
export async function readPaperPassedApplicantsForMozip() {
	if (isTest) {
		return {};
	}
	return {};
}

/**
 * 면접 기록 목록 조회
 */
export async function readInterviewRecordsForMozip() {
	if (isTest) {
		return {};
	}
	return {};
}

/**
 * 면접 평가 점수 목록 조회
 */
export async function readInterviewEvaluationScoresForMozip() {
	if (isTest) {
		return {};
	}
	return {};
}