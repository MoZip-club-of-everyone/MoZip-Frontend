"use client";

import React from "react";
import styled from "styled-components";

interface CustomModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    width?: string;
    height?: string;
    alignItems?: string;
    justifyContent?: string;
    gap?: string;
    padding?: string;
    borderRadius?: string;
    backgroundColor?: string;
}

interface ModalOverlayProps {
    isOpen: boolean;
}

interface ModalContainerProps {
    isOpen: boolean;
    width: string;
    height: string;
    alignItems: string;
    justifyContent: string;
    gap: string;
    padding: string;
    borderRadius: string;
    backgroundColor: string;
}

const ModalOverlay = styled.div<ModalOverlayProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
`;

const ModalContainer = styled.div<ModalContainerProps>`
  background-color: ${(props) => props.backgroundColor};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};
  gap: ${(props) => props.gap};
  padding: ${(props) => props.padding};
  border-radius: ${(props) => props.borderRadius};
  transition: transform 0.3s ease-in-out;
  transform: ${(props) => (props.isOpen ? "scale(1)" : "scale(0.8)")};
`;

const CustomModal: React.FC<CustomModalProps> = ({
    isOpen,
    onClose,
    children,
    width = "100%",
    height = "30%",
    alignItems = "center",
    justifyContent = "center",
    gap = "0.5rem",
    padding = "0.5rem",
    borderRadius = "0.5rem",
    backgroundColor = "white",
}) => {
    return (
        <ModalOverlay isOpen={isOpen} onClick={onClose}>
            <ModalContainer
                isOpen={isOpen}
                width={width}
                height={height}
                alignItems={alignItems}
                justifyContent={justifyContent}
                gap={gap}
                padding={padding}
                borderRadius={borderRadius}
                backgroundColor={backgroundColor}
            >
                {children}
            </ModalContainer>
        </ModalOverlay>
    );
};

export default CustomModal;