
export interface ReadPaperApplications {
  applicant_id: string;
  application_number: number;
  applied_at: string;
  email: string;
  phone: string;
  realname: string;
  paper_score_average: number | null;
  paper_status: string;
}

export interface ApplicantsResponse {
  total_cnt: number;
  passed_cnt: number;
  failed_cnt: number;
  applicants: ReadPaperApplications[];
}


export interface Applicant {
  applicant_id: string;
  application_number: number;
  applied_at: string;
  email: string;
  phone: string;
  realname: string;
  paper_score_average: number;
  paper_status: string;
}
export interface ReadPaperApplicantsForMozipData {
  total_cnt: number;
  passed_cnt: number;
  failed_cnt: number;
  applicants: Applicant[];
}

//  개별 지원자의 타입 정의
export interface ReadPaperApplications {
  answer_id: string;
  applicant_id: string;
  realname: string;
  answer: string;
  score: number | null;
}

// API 응답 타입 정의
export interface ApplicantsResponse {
  total_cnt: number;
  passed_cnt: number;
  failed_cnt: number;
  applicants: ReadPaperApplications[];
  // applicants: Applicant[];
}


export interface ReadPaperApplicationsForMozipData {
  type: string;
  question_id: string;
  question: string;
  answers: ReadPaperApplications[];
  realname: string;
}
