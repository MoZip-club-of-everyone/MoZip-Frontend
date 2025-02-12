// Zustand store
"use client"
import { useModalStore } from '@/stores/useModalStore'

export const useModals = () => {
  const { isModalOpen, openModal, closeModal } = useModalStore()
  return { isModalOpen, openModal, closeModal }
}
// 여기는 그냥 useModals
// "use client"

// import { useState, useCallback } from "react"

// // 담당자: 현아
// // 모달의 열림/닫힘 상태를 관리하는 훅입니다.

// export const useModals = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false); //모달 상태 관리

//   const openModal = useCallback(()=> {
//     setIsModalOpen(true);
//   },[]); //모달 열기

//   const closeModal = useCallback(()=>{
//     setIsModalOpen(false);
//   },[]); //모달 닫기

//   return { isModalOpen, openModal, closeModal};
// };


//여기는 컨텍스트 api사용시 코드
// "use client";

// import { useContext } from "react";
// import ModalContext from "@/context/ModalContext";
// // 커스텀 훅
// export const useModals = () => {
//   const context = useContext(ModalContext);

//   if (!context) {
//     throw new Error("useModals must be used within a ModalProvider");
//   }

//   return context;
// };
