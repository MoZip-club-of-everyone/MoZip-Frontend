"use client";

import { useState } from "react";
import styled from "styled-components";
import CustomColumn from "@/components/CustomColumn";
import CustomBox from "@/components/CustomBox";

import DefaultLogin from "./LoginBlocks/DefaultLogin";
import Certificate from "./LoginBlocks/Certificate";
import FindID from "./LoginBlocks/FindID";
import FindPW from "./LoginBlocks/FindPW";

const CustomBoxWithShadow = styled(CustomBox)`
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1);
	border-radius: 1rem;
	padding: 1rem;
`;

export default function LogIn() {
	const [currentView, setCurrentView] = useState<"login" | "certificate" | "findID" | "findPW">("login");
	const [nextView, setNextView] = useState<"findID" | "findPW" | null>(null);

	const renderContent = () => {
		switch (currentView) {
			case "certificate":
				return (
					<Certificate
						onComplete={() => {
							if (nextView) {
								setCurrentView(nextView); // 다음 화면으로 전환
								setNextView(null); // nextView 초기화
							}
						}}
					/>
				);
			case "findID":
				return <FindID setCurrentView={setCurrentView} />;
			case "findPW":
				return <FindPW setCurrentView={setCurrentView} />;
			default:
				return (
					<DefaultLogin
						setCurrentView={setCurrentView}
						setNextView={setNextView}
					/>
				);
		}
	};

	return (
		<CustomColumn $width="100%" $height="100vh" $alignitems="center" $justifycontent="center">
			<CustomBoxWithShadow $width="30%" $height="auto" $backgroundcolor="white" $gap="4rem">
				{renderContent()}
			</CustomBoxWithShadow>
		</CustomColumn>
	);
}
