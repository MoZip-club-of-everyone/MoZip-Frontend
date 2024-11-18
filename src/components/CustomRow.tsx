"use client";

import styled from "styled-components";

// 수정 금지
// row 구조가 필요한 경우 이 컴포넌트 사용

interface CustomRowProps {
	$width?: string;
	$maxwidth?: string;
	$height?: string;
	$gap?: string;
	$alignitems?: string;
	$justifycontent?: string;
	$margin?: string;
	$padding?: string;
}

const CustomRow = styled.div<CustomRowProps>`
  display: flex;
  flex-direction: row;
  width: ${(props) => props.$width || "auto"};
  max-width: ${(props) => props.$maxwidth || "none"};
  height: ${(props) => props.$height || "auto"};
  gap: ${(props) => props.$gap || "10px"};
  align-items: ${(props) => props.$alignitems || "center"};
  justify-content: ${(props) => props.$justifycontent || "center"};
  margin: ${(props) => props.$margin || '0'};
  padding: ${(props) => props.$padding || '0'};
`;

export default CustomRow;