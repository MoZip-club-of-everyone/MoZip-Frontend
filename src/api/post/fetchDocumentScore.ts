import axiosInstance from "@/api/axiosInstance";

interface Evaluation {
	realname: string;
	score: number;
}

interface Applicant {
	application_number: number;
	applicant_id: string;
	realname: string;
	evaluations: Evaluation[];
	everage: number;
	status: string;
}

export interface ApiResponse {
	mozip_id: string;
	total_cnt: number;
	passed_cnt: number;
	failed_cnt: number;
	applicants: Applicant[];
}

export async function fetchDocumentScore(mozipId: string): Promise<ApiResponse> {
	try {
		const response = await axiosInstance.get(`/mozip/${mozipId}/applicants/paper-evaluations`);
		return response.data;
	} catch (error) {
		console.error("서류지원자 점수 로드 실패:", error);
		throw error;
	}
}
