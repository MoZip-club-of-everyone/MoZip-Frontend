"use client";

import styled from 'styled-components';

// 수정 금지
// 이미지를 넣어야 할 경우 이 컴포넌트 사용 

interface StyledImgProps {
	$width?: string;
	$height?: string;
	$margin?: string;
	$padding?: string;
	$borderradius?: string;
	$border?: string;
	$cursor?: string;
}

const StyledImg = styled.img<StyledImgProps>`
  width: ${(props) => props.$width || 'auto'};
  height: ${(props) => props.$height || 'auto'};
  margin: ${(props) => props.$margin || '0'};
  padding: ${(props) => props.$padding || '0'};
  border-radius: ${(props) => props.$borderradius || '0'};
  border: ${(props) => props.$border || 'none'};
  cursor: ${(props) => props.$cursor || 'none'};
`;

export default StyledImg;