import axiosInstance from "@/api/axiosInstance";

interface manageDocumentGETResponse {
	total_cnt: number;
	passed_cnt: number;
	failed_cnt: number;
	applicants: {
		applicant_id: string;
		application_number: number;
		realname: string;
		applied_at: string;
		paper_score: number;
		email: string;
		phone: string;
		status: string;
	}[];
}

export async function manageDocumentGET(): Promise<manageDocumentGETResponse> {

	const mozip_id = '01F8MECHZX3TBDSZ7W3D5B9FQ9';

	try {
		const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
		const response = await axiosInstance.get(`/mozip/01F8MECHZX3TBDSZ7W3D5B9FQ9/applicants`, {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		});

		return response.data;
	} catch (error) {
		console.error("지원자 목록 불러오기 실패: ", error);
		throw error;
	}
}
