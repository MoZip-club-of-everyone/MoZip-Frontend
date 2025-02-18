import { useEffect, useState } from "react";
import { MdOutlineContentCopy } from "react-icons/md";
import { BsDownload } from "react-icons/bs";
import styled from "styled-components";
import CustomColumn from "@/components/CustomColumn";
import CustomFont from "@/components/CustomFont";
import CustomRow from "@/components/CustomRow";
import {
  ReadPaperApplicant,
  ReadPaperApplicantsForMozipData,
} from "@/api/applicants.type";
import { getReadPaperApplicationsForMozip } from "@/api/applicants";

const Applicant = styled.p<{ blue?: boolean }>`
  font-size: 16px;
  color: ${({ blue }) => (blue ? "#5296FF" : "inherit")};
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  thead th {
    border-top: 2px solid #ddd;
    border-bottom: 2px solid #ddd;
    background-color: white;
    font-weight: bold;
    padding: 8px;
    text-align: center;
  }

  tbody td {
    padding: 8px;
    text-align: center;
    background-color: white;
  }

  tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tbody tr:hover {
    background-color: #f1f1f1;
  }
`;

const BtnsLeft = styled.div`
  display: flex;
  gap: 1rem;
`;

const BtnsRight = styled.div`
  display: flex;
  gap: 1rem;
`;

const CheckButton = styled.div`
  display: flex;
  border: 1px solid #464646;
  padding: 3px 5px;
  border-radius: 4px;
  align-items: center;
  gap: 0.5rem;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;

export default function List() {
  const [applicantsData, setApplicantsData] =
    useState<ReadPaperApplicantsForMozipData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedApplicants, setSelectedApplicants] = useState<string[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await getReadPaperApplicationsForMozip();
      if (response && response.length > 0) {
        setApplicantsData(response[0]);
      }
    } catch (error) {
      console.error("서류 지원자 목록 데이터 가져오기 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked && applicantsData) {
      setSelectedApplicants(
        applicantsData.applicants.map((a) => a.applicant_id)
      );
    } else {
      setSelectedApplicants([]);
    }
  };

  const handleSelectApplicant = (applicantId: string) => {
    setSelectedApplicants((prev) => {
      if (prev.includes(applicantId)) {
        return prev.filter((id) => id !== applicantId);
      }
      return [...prev, applicantId];
    });
  };

  const copyEmails = () => {
    if (!applicantsData) return;

    const selectedEmails = applicantsData.applicants
      .filter((applicant) =>
        selectedApplicants.includes(applicant.applicant_id)
      )
      .map((applicant) => applicant.email)
      .join(", ");

    navigator.clipboard.writeText(selectedEmails);
    alert("이메일 주소가 복사되었습니다.");
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (!applicantsData) {
    return <div>데이터를 불러올 수 없습니다.</div>;
  }

  return (
    <CustomColumn
      $width="100%"
      $alignitems="flex-start"
      $justifycontent="flex-start"
      $gap="0px"
    >
      {/* Header Section */}
      <CustomRow
        $width="100%"
        $alignitems="flex-end"
        $justifycontent="flex-start"
      >
        <CustomFont $font="24px" $color="#363636" $fontweight="bold">
          서류 지원자 목록
        </CustomFont>
        <Applicant blue>전체 {applicantsData.total_cnt}명</Applicant> |{" "}
        <Applicant>합격자 {applicantsData.passed_cnt}명</Applicant> |{" "}
        <Applicant>불합격자 {applicantsData.failed_cnt}명</Applicant>
      </CustomRow>

      {/* Buttons Section */}
      <CustomRow $width="100%" $justifycontent="space-between" $margin="0.5rem">
        <BtnsLeft>
          <CheckButton>서류합격</CheckButton>
          <CheckButton>서류불합격</CheckButton>
          <CheckButton>보류</CheckButton>
          <CheckButton>예비</CheckButton>
        </BtnsLeft>
        <BtnsRight>
          <CheckButton onClick={copyEmails}>
            <MdOutlineContentCopy />
            이메일 주소 복사
          </CheckButton>
          <CheckButton>
            <BsDownload />
            PDF 다운로드
          </CheckButton>
        </BtnsRight>
      </CustomRow>

      {/* Table Section */}
      <TableWrapper>
        <StyledTable>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={
                    selectedApplicants.length ===
                    applicantsData.applicants.length
                  }
                />
              </th>
              <th>지원번호</th>
              <th>성명</th>
              <th>지원일시</th>
              <th>지원서</th>
              <th>서류 평가점수</th>
              <th>이메일</th>
              <th>전화번호</th>
              <th>합격여부</th>
            </tr>
          </thead>
          <tbody>
            {applicantsData.applicants.map((applicant) => (
              <tr key={applicant.applicant_id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedApplicants.includes(
                      applicant.applicant_id
                    )}
                    onChange={() =>
                      handleSelectApplicant(applicant.applicant_id)
                    }
                  />
                </td>
                <td>{applicant.application_number}</td>
                <td>{applicant.realname}</td>
                <td>{new Date(applicant.applied_at).toLocaleString()}</td>
                <td>
                  <a
                    href="#"
                    style={{ color: "#5296FF", textDecoration: "none" }}
                  >
                    지원서
                  </a>
                </td>
                <td>{applicant.paper_score_average.toFixed(2)}</td>
                <td>{applicant.email}</td>
                <td>{applicant.phone}</td>
                <td>{applicant.paper_status}</td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </TableWrapper>
    </CustomColumn>
  );
}
