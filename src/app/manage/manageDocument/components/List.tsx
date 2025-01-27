import { useEffect, useState } from "react";
import axiosInstance from "@/api/axiosInstance";
import CustomColumn from "@/components/CustomColumn";
import CustomFont from "@/components/CustomFont";
import CustomRow from "@/components/CustomRow";
import styled from "styled-components";

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

interface ApplicantData {
  applicant_id: string;
  application_number: number;
  realname: string;
  applied_at: string;
  paper_score: number;
  email: string;
  phone: string;
  status: string;
}

export default function List(): any {
  const [applicants, setApplicants] = useState<ApplicantData[]>([]);
  const [totalCnt, setTotalCnt] = useState(0);
  const [passedCnt, setPassedCnt] = useState(0);
  const [failedCnt, setFailedCnt] = useState(0);

  useEffect(() => {
    async function fetchApplicants() {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
        const response = await axiosInstance.get(
          `/mozip/{mozip_id}/applicants`,
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        setApplicants(response.data.applicants);
        setTotalCnt(response.data.total_cnt);
        setPassedCnt(response.data.passed_cnt);
        setFailedCnt(response.data.failed_cnt);
      } catch (error) {
        console.error("지원자 목록 불러오기 실패: ", error);
      }
    }

    fetchApplicants();
  }, []);

  return (
    <>
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
          <Applicant blue>전체 {totalCnt}명</Applicant> |{" "}
          <Applicant>합격자 {passedCnt}명</Applicant> |{" "}
          <Applicant>불합격자 {failedCnt}명</Applicant>
        </CustomRow>

        {/* Table Section */}
        <TableWrapper>
          <StyledTable>
            <thead>
              <tr>
                <th></th>
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
              {applicants.map((applicant) => (
                <tr key={applicant.applicant_id}>
                  <td>
                    <input type="checkbox" />
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
                  <td>{applicant.paper_score}</td>
                  <td>{applicant.email}</td>
                  <td>{applicant.phone}</td>
                  <td>{applicant.status}</td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </TableWrapper>
      </CustomColumn>
    </>
  );
}
