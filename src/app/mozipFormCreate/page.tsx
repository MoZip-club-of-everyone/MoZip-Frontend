"use client";

// Figma 좌측 네비게이션 바에서 [ 모집폼 관리] 클릭하여 나타나는 화면입니다.
// 담당자(담당 브랜치): nayeong

// MozipTabs의 3개 메뉴는 MozipBlocks 폴더 내부의 중앙 컴포넌트 3개로 구현되어 있습니다.
// MozipBlocks의 컴포넌트 3개는 components의 세부 컴포넌트들로 구성됩니다.
// MozipLayout 폴더에서 SideBar와 Header를 정의하고, 레이아웃 컴포넌트를 정의했습니다.

import { useState } from "react";
import MozipDescription from "./MozipBlocks/MozipDescription";
import MozipQuestions from "./MozipBlocks/MozipQuestions";
import MozipSetting from "./MozipBlocks/MozipSetting";
import MozipTabs from "./MozipTabs/MozipTabs";
import MozipLayout from "./MozipLayout/MozipLayout";

export default function Home() {
	const [activeTab, setActiveTab] = useState("설명 작성");

	const renderContent = () => {
		switch (activeTab) {
			case "설명 작성":
				return <MozipDescription />;
			case "질문 작성":
				return <MozipQuestions />;
			case "설정":
				return <MozipSetting />;
			default:
				return null;
		}
	};

	return (
		<MozipLayout>
			<MozipTabs activeTab={activeTab} setActiveTab={setActiveTab} />
			{renderContent()}
		</MozipLayout>
	);
}

