import CustomFont from "@/components/CustomFont";
import CustomRow from "@/components/CustomRow";
import styled from "styled-components";

const Applicant = styled.p<{ blue?: boolean }>`
  font-size: 16px;
  color: ${({ blue }) => (blue ? "#5296FF" : "inherit")};
`;

export default function MozipManageDocumentsScore(): any {
  return <>점수보기</>;
}
