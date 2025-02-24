//서류 지원자 목록 조회
export interface ReadPaperApplicant {
  applicant_id: string;
  application_number: number;
  realname: string;
  applied_at: string;
  email: string;
  phone: string;
  paper_score_average: number;
  paper_score_standard_deviation: number;
  paper_status: string;
}
export interface ReadPaperApplicantsForMozipData {
  total_cnt: number;
  passed_cnt: number;
  failed_cnt: number;
  applicants: ReadPaperApplicant[];
}

//서류 지원서 조회
export interface ReadPaperApplications {
  answer_id: string;
  applicant_id: string;
  realname: string;
  answer: string;
  score: number;
}
export interface ReadPaperApplicationsForMozipData {
  type: string; // 질문 유형
  question_id: string;
  question: string;
  answers: ReadPaperApplications[];
}
