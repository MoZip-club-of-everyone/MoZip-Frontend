"use client";

import styled from 'styled-components';

// 수정 금지
// column 구조가 필요한 경우 이 컴포넌트 사용 

interface CustomColumnProps {
	$width?: string;
	$height?: string;
	$gap?: string;
	$alignitems?: string;
	$justifycontent?: string;
	$margin?: string;
	$padding?: string;
}

const CustomColumn = styled.div<CustomColumnProps>`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.$width || 'auto'};
  height: ${(props) => props.$height || 'auto'};
  gap: ${(props) => props.$gap || '30px'};
  align-items: ${(props) => props.$alignitems || 'center'};
  justify-content: ${(props) => props.$justifycontent || 'center'};
  margin: ${(props) => props.$margin || '0'};
  padding: ${(props) => props.$padding || '0'};
`;

export default CustomColumn;