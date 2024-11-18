"use client";

// 로그인 화면
// 담당자(담당 브랜치): hyuna -> nayeong

import styled from "styled-components";
import CustomColumn from "@/components/CustomColumn";
import CustomBox from "@/components/CustomBox";
import CustomFont from "@/components/CustomFont";

import DefaultLogin from "./LoginBlocks/DefaultLogin";

const CustomBoxWithShadow = styled(CustomBox)`
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1);
	border-radius: 1rem;
	padding: 1rem;
`;


export default function LogIn() {
	return (
		<CustomColumn $width="100%" $height='100vh' $alignitems="center" $justifycontent="center">
			<CustomBoxWithShadow $width='30%' $height='auto' $backgroundcolor="white" $gap='4rem'>
				<DefaultLogin />
			</CustomBoxWithShadow>
		</CustomColumn>
	);
}
