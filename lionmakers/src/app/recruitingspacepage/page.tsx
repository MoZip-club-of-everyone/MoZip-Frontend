"use client";

import styled from "styled-components";
import { useEffect, useState } from 'react';

import CustomFont from "@/components/CustomFont";
import CustomColumn from "@/components/CustomColumn";

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 5rem;
min-height: 100vh;
padding: 1rem 10vh 10rem;
`;

export default function RecruitingSpacePage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // 클라이언트 사이드에서만 렌더링

    return (
        <Container>
            <CustomColumn>
                <CustomFont color='white' font="1rem">여기는 다른 화면!</CustomFont>
            </CustomColumn>
        </Container>
    );
}