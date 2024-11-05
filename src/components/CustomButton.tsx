"use client";

import styled from "styled-components";

// 수정 금지
// 버튼 제작 시 해당 컴포넌트 활용

interface CustomButtonProps {
	$width?: string | number;
	$height?: string | number;
	$gap?: string | number;
	$display?: string;
	$flexDirection?: string;
	$alignItems?: string;
	$justifyContent?: string;
	$margin?: string;
	$padding?: string;
	$backgroundColor?: "primary" | "secondary" | string; // theme 색상 or 색상 직접 정의
	$color?: string;
	$border?: string;
	$borderRadius?: string;
	$hoverBackgroundColor?: string;
	$hoverOpacity?: string | number;
}

const CustomButton = styled.button<CustomButtonProps>`
  width: ${(props) => props.$width || "100%"};
  height: ${(props) => props.$height || "3rem"};
  gap: ${(props) => props.$gap || "1rem"};
  display: ${(props) => props.$display || "flex"};
  flex-direction: ${(props) => props.$flexDirection || "row"};
  align-items: ${(props) => props.$alignItems || "center"};
  justify-content: ${(props) => props.$justifyContent || "center"};
  margin: ${(props) => props.$margin || "0"};
  padding: ${(props) => props.$padding || "0.75rem 1.5rem"};
  
  background: ${(props) => {
		const theme = props.theme;
		if (props.$backgroundColor === "primary") return theme.button.primary;
		if (props.$backgroundColor === "secondary") return theme.button.secondary;
		return props.$backgroundColor || theme.button.primary;
	}};
  
  color: ${(props) => props.$color || "black"};
  border: ${(props) => props.$border || "none"};
  border-radius: ${(props) => props.$borderRadius || "0.5rem"};
  cursor: pointer;
  transition: opacity 0.1s ease-in-out;

  /* Hover 스타일링 */
  &:hover {
    background: ${(props) =>
		props.$hoverBackgroundColor || props.$backgroundColor};
    opacity: ${(props) => props.$hoverOpacity || 0.7};
  }
`;

export default CustomButton;
