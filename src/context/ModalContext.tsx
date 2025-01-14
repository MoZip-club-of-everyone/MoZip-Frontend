"use client";

import { createContext, useState, useCallback, ReactNode } from "react";

// 담당자: 현아
// Context와 Provider를 정의하고, 전역 상태를 제공합니다.

// Context 정의
const ModalContext = createContext<{
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
} | null>(null);

// Provider 컴포넌트 구현
export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

// Context를 export
export default ModalContext;
