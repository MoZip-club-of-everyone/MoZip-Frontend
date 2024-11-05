"use client";

import React, { useState } from "react";
import styled from "styled-components";

// 담당자: 나영
// MozipBlock 내부의 Textarea 컴포넌트입니다.

interface MozipBlockTextareaProps {
	$width?: string;
	$height?: string;
	$padding?: string;
	$margin?: string;
	$bordercolor?: string;
	$borderradius?: string;
	$highlightcolor?: string;
	$placeholder?: string;
	$overflowx?: string;
	$overflowy?: string;
	maxLength?: number;
}

const TextareaWrapper = styled.div<MozipBlockTextareaProps>`
  position: relative;
  width: ${(props) => props.$width || "100%"};
`;

const StyledMozipBlockTextarea = styled.textarea<MozipBlockTextareaProps>`
  width: 100%;
  height: ${(props) => props.$height || "10rem"};
  padding: ${(props) => props.$padding || "0.5rem"};
  margin: ${(props) => props.$margin || "0"};
  border: ${(props) => props.$bordercolor || "1px solid #D9D9D9"};
  border-radius: ${(props) => props.$borderradius || "0.5rem"};
  outline: none;
  overflow-x: ${(props) => props.$overflowx || "auto"};
  overflow-y: ${(props) => props.$overflowy || "auto"};

  ::placeholder {
    color: #b0b0b0;
  }

  &:focus {
    border-color: ${(props) => props.$highlightcolor || "#8BB9FF"};
  }

  /* 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #D9D9D9;
    border-radius: 5px;
    border: none;
  }
`;

const CharacterCount = styled.div`
  position: absolute;
  bottom: 5px;
  right: 10px;
  font-size: 0.875rem;
  color: #b0b0b0;
`;

const MozipBlockTextarea: React.FC<MozipBlockTextareaProps> = ({
	$placeholder = "여기에 입력...",
	maxLength = 1000, // 1000자를 최대로 기본 설정했음
	...props
}) => {
	const [charCount, setCharCount] = useState(0);

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setCharCount(event.target.value.length);
	};

	return (
		<TextareaWrapper $width={props.$width}>
			<StyledMozipBlockTextarea
				placeholder={$placeholder}
				maxLength={maxLength}
				onChange={handleChange}
				{...props}
			/>
			<CharacterCount>
				{charCount}/{maxLength.toLocaleString()}
			</CharacterCount>
		</TextareaWrapper>
	);
};

export default MozipBlockTextarea;
