export interface updatePaperStatusType {
  applicants: updatePaperApplicant[];
}

export interface updatePaperApplicant {
  applicant_id: string;
  status: string;
}
