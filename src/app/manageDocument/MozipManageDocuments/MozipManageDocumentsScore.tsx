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

export default function MozipManageDocumentsScore(): any {
  const CoreList = [
    { name: "김현아", score: 96 },
    { name: "이나영", score: 96 },
    { name: "이수혁", score: 96 },
    { name: "임승민", score: 96 },
    { name: "이예림", score: 96 },
    { name: "정재웅", score: 96 },
  ];
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
          // $padding="1rem"
        >
          <CustomFont $font="24px" $color="#363636" $fontweight="bold">
            서류 평가 점수
          </CustomFont>
          <Applicant blue>전체 146명</Applicant> |{" "}
          <Applicant>합격자 20명</Applicant> |{" "}
          <Applicant>불합격자 126명</Applicant>
        </CustomRow>
        <TableWrapper>
          <StyledTable>
            <thead>
              <tr>
                <th></th>
                <th>지원번호</th>
                <th>성명</th>
                <th>지원서</th>
                {CoreList.map((Core) => (
                  <th key={Core.name}>{Core.name}</th>
                ))}
                <th>평균점수</th>
                <th>합격여부</th>
                <th>이메일</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(20)].map((_, index) => (
                <tr key={index}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{index + 1}</td>
                  <td>김하린</td>
                  <td>
                    <a
                      href="#"
                      style={{ color: "#5296FF", textDecoration: "none" }}
                    >
                      지원서
                    </a>
                  </td>
                  {CoreList.map((Core) => (
                    <td key={Core.name}>{Core.score}</td>
                  ))}
                  <td>
                    {(
                      CoreList.reduce((sum, { score }) => sum + score, 0) /
                      CoreList.length
                    ).toFixed(2)}
                  </td>
                  <td>서류합격</td>
                  <td>cu4149@gmail.com</td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </TableWrapper>
      </CustomColumn>
    </>
  );
}
