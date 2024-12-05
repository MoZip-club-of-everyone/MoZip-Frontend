"use client";

// 담당자(담당 브랜치): nayeong
// Header, SideBar 위치를 정의하고, 중앙에 컴포넌트를 갈아낄 수 있도록 만든 레이아웃 컴포넌트 파일입니다.
// Header, SideBar 레이아웃이 필요하다면 이 컴포넌트를 import하여 사용하세요.

import styled from "styled-components";
import CustomColumn from "@/components/CustomColumn";
import HomeHeader from "./HomeHeader";

const CustomColumnNew = styled(CustomColumn)`
	min-height: 100vh;
`;

interface HomeLayoutProps {
	children: React.ReactNode;
	setActiveTab: (tab: string) => void;
}

export default function HomeLayout({ children, setActiveTab }: HomeLayoutProps) {
	return (
		<CustomColumnNew $width="100%" $gap="0" $alignitems="center" $justifycontent="flex-start">
			<HomeHeader setActiveTab={setActiveTab} />
			{children}
		</CustomColumnNew>
	);
}
