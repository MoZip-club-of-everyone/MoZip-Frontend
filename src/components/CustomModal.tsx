"use client"

import styled from "styled-components"
import { ReactNode } from "react";

// 수정 금지
// 모달 제작 시 해당 컴포넌트 활용

interface CustomModalProps{
  isOpen: boolean; // 모달의 열림/닫힘 상태
  onClose: () => void; // 모달 닫기 콜백 함수
  children: ReactNode; // 모달 내부에 렌더링할 내용
  $width?: string;
  $height?: string;
  $padding?: string;
  $backgroundcolor?: string;
  $color?: string;
  $borderradius?: string;
  $zindex?: string;
}
interface ModalContentProps{
  $width?: string;
  $height?: string;
  $padding?: string;
  $gap?: string;
  $backgroundcolor?: string;
  $color?: string;
  $borderradius?: string;
  $zindex?: string;
}

const ModalOverlay = styled.div<{$isOpen: boolean}>`
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(170, 170, 170, 0.5);
  justify-content: center;
  align-items: center;
  z-index: ${({ $isOpen }) => ($isOpen ? 1000 : -1)};
`;

const ModalContent = styled.div<ModalContentProps>`
  width: ${(props) => props.$width || "430px"};
  height: ${(props) => props.$height || "476px"};
  padding: ${(props) => props.$padding || "1.5rem"};
  gap: ${(props) => props.$gap || "2vh"};
  background-color: ${(props) => props.$backgroundcolor || "#fff"};
  color: ${(props) => props.$color || "#000"};
  border-radius: ${(props) => props.$borderradius || "1rem"};
  z-index: ${(props) => props.$zindex || "1001"};
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`

export default function CustomModal({isOpen, onClose, children, ...props}: CustomModalProps) {
  return(
    <ModalOverlay $isOpen={isOpen} onClick={onClose}>
      <ModalContent
        {...props}
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않도록 방지
      >
        {children}
      </ModalContent>
    </ModalOverlay>
);
};