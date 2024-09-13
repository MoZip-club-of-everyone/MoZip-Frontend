"use client";

import styled from "styled-components";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import CustomFont from "@/components/CustomFont";
import CustomColumn from "@/components/CustomColumn";
import CustomButton from "@/components/CustomButton";

import Ex_Conponent from "./mainpage/exConponent";

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 5rem;
min-height: 100vh;
padding: 1rem 10vh 10rem;
`;

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // 클라이언트 사이드에서만 렌더링

  const handleNavigation = () => {
    router.push('/recruitingspacepage');
  };

  return (
    <Container>
      <CustomColumn gap='3rem'>
        <CustomFont color='white' font="1rem">안녕! 여기가 메인화면입니다</CustomFont>
        <CustomButton onClick={handleNavigation}>
          <CustomFont color='white' font='1rem'>다른화면</CustomFont>
        </CustomButton>

        <Ex_Conponent />
      </CustomColumn>
    </Container>
  );
}