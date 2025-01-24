import axiosInstance from "@/api/axiosInstance";

interface fetchQuestionsResponse {
	questions: {
		question_id: string;
		question_content: string;
		answers: {
			applicant_id: string;
			realname: string;
			answer: string;
			score: number;
		}[];
	}[];
}

export async function fetchQuestions(mozipId: string): Promise<fetchQuestionsResponse> {
	try {
		const response = await axiosInstance.get(`/mozip/${mozipId}/applicants/paper/answers`);
		return response.data;
	} catch (error) {
		console.error("지원서 API 로드 실패: ", error);
		throw error;
	}
}
