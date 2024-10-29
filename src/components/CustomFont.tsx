"use client";

import styled from 'styled-components';

// 수정 금지
// Font 설정 시 해당 컴포넌트 사용

interface CustomFontProps {
	$font?: string;
	$color?: string;
	$fontweight?: string;
	$fontfamily?: string;
}

const CustomFont = styled.a<CustomFontProps>`
  font-size: ${(props) => props.$font || '0.8rem'};
  color: ${(props) => props.$color || '#F0F0F0'};
  font-weight: ${(props) => props.$fontweight || 'normal'};
  font-family: ${(props) => props.$fontfamily || "none"};
`;

export default CustomFont;