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
