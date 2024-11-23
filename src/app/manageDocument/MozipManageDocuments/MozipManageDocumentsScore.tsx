import CustomColumn from "@/components/CustomColumn";
import CustomFont from "@/components/CustomFont";
import CustomRow from "@/components/CustomRow";
import styled from "styled-components";

const Applicant = styled.p<{ blue?: boolean }>`
  font-size: 16px;
  color: ${({ blue }) => (blue ? "#5296FF" : "inherit")};
`;

export default function MozipManageDocumentsScore(): any {
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
      </CustomColumn>
    </>
  );
}
