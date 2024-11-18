"use client";

// 로딩 시 첫화면 (메인화면)
// 담당자(담당 브랜치): hyuna
import { useState } from "react";
import HomeLayout from "./HomeLayout/HomeLayout";
import HomeTabs from "./components/HomeTabs";
import Club from "./HomeBlocks/Club";
import Mozip from "./HomeBlocks/Mozip";

export default function Home() {
	const [activeTab, setActiveTab] = useState("동아리");

	const renderContent = () => {
		switch (activeTab) {
			case "동아리":
				return <Club />;
			case "모집":
				return <Mozip />;
			default:
				return null;
		}
	};

	return (
		<HomeLayout>
			<HomeTabs activeTab={activeTab} setActiveTab={setActiveTab} />
			{renderContent()}
		</HomeLayout>
	);
}
