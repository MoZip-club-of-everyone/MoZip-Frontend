import { useEffect, useState } from "react";
import { fetchDocumentScore, ApiResponse } from "@/api/post/fetchDocumentScore";
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

export default function MozipManageDocumentsScore(): JSX.Element {
  const [data, setData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    async function fetchScore() {
      try {
        const mozipId = "01F8MECHZX3TBDSZ7W3D5B9FQ9";
        const fetchedData = await fetchDocumentScore(mozipId);
        setData(fetchedData);
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      }
    }

    fetchScore();
  }, []);

  if (!data) {
    return <p>로딩 중...</p>;
  }

  return (
    <CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="flex-start" $gap="0px">
      {/* Header Section */}
      <CustomRow $width="100%" $alignitems="flex-end" $justifycontent="flex-start">
        <CustomFont $font="24px" $color="#363636" $fontweight="bold">
          서류 평가 점수
        </CustomFont>
        <Applicant blue>전체 {data.total_cnt}명</Applicant> |{" "}
        <Applicant>합격자 {data.passed_cnt}명</Applicant> |{" "}
        <Applicant>불합격자 {data.failed_cnt}명</Applicant>
      </CustomRow>

      {/* Table Section */}
      <TableWrapper>
        <StyledTable>
          <thead>
            <tr>
              <th></th>
              <th>지원번호</th>
              <th>성명</th>
              <th>지원서</th>
              {data.applicants[0]?.evaluations.map((evaluation) => (
                <th key={evaluation.realname}>{evaluation.realname}</th>
              ))}
              <th>평균점수</th>
              <th>합격여부</th>
            </tr>
          </thead>
          <tbody>
            {data.applicants.map((applicant) => (
              <tr key={applicant.applicant_id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{applicant.application_number}</td>
                <td>{applicant.realname}</td>
                <td>
                  <a href="#" style={{ color: "#5296FF", textDecoration: "none" }}>
                    지원서
                  </a>
                </td>
                {applicant.evaluations.map((evaluation) => (
                  <td key={evaluation.realname}>{evaluation.score}</td>
                ))}
                <td>{applicant.everage.toFixed(2)}</td>
                <td>{applicant.status}</td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </TableWrapper>
    </CustomColumn>
  );
}
