"use client";

import styled from "styled-components";

// 담당자: 나영
// Text Field 컴포넌트입니다. 완성된 상태입니다.

interface MozipBlockInputProps {
  $width?: string;
  $height?: string;
  $padding?: string;
  $margin?: string;
  $bordercolor?: string;
  $borderradius?: string;
  $highlightcolor?: string;
  $placeholder?: string;
}

const StyledMozipBlockInput = styled.input<MozipBlockInputProps>`
  width: ${(props) => props.$width || "100%"};
  height: ${(props) => props.$height || "5rem"};
  padding: ${(props) => props.$padding || "0.5rem"};
  margin: ${(props) => props.$margin || "0"};
  border: ${(props) => props.$bordercolor || "1px solid #D9D9D9"};
  border-radius: ${(props) => props.$borderradius || "0.5rem"};
  outline: none;

  ::placeholder {
    color: #b0b0b0;
  }

  &:focus {
    border-color: ${(props) => props.$highlightcolor || "#8BB9FF"};
  }
`;

const MozipBlockInput: React.FC<MozipBlockInputProps> = ({
  $placeholder = "여기에 입력...",
  ...props
}) => {
  return <StyledMozipBlockInput placeholder={$placeholder} {...props} />;
};

export default MozipBlockInput;
