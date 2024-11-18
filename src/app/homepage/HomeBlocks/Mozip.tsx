"use client";

import styled from "styled-components";
import CustomColumn from "@/components/CustomColumn";
import CustomFont from "@/components/CustomFont";

import AddNewMozip from "../components/AddNewMozip";
import MozipProgressButton from "../components/MozipProgressButton";
import MozipDivider from "../components/MozipDivider";

// 담당자: 현아
// Figma : 홈 > [ 모집 ] 탭 클릭 시 나타나는 컴포넌트입니다.
// 모집에 대한 설명을 작성하는 컴포넌트 파일입니다.

const CustomColumnMargin = styled(CustomColumn)`
	margin-top: 1rem;
	min-height: 100vh;
`;

export default function Mozip() {

	const hasAddNewMozip = true; // AddNewMozip 컴포넌트의 존재 여부

	return (
		<CustomColumnMargin $width="80%" $alignitems="center" $justifycontent="flex-start" $gap="2rem">
			<AddNewMozip />
			<MozipDivider text="모집 전" hasAddNewMozip={hasAddNewMozip} />
			<MozipProgressButton />
			<MozipDivider text="모집 중" hasAddNewMozip={false} />
			<MozipDivider text="서류 평가 중" hasAddNewMozip={hasAddNewMozip} />
			<MozipProgressButton />
			<MozipDivider text="면접 평가 중" hasAddNewMozip={false} />
			<MozipDivider text="최종 평가 중" hasAddNewMozip={false} />
			<MozipDivider text="평가 완료" hasAddNewMozip={false} />
		</CustomColumnMargin>
	);
}
