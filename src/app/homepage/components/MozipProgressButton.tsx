"use client";

import styled from "styled-components";
import CustomFont from "@/components/CustomFont";
import CustomRow from "@/components/CustomRow";
import CustomButton from "@/components/CustomButton";
import CustomBox from "@/components/CustomBox";
import CustomColumn from "@/components/CustomColumn";
import { BsDot } from "react-icons/bs";

// 담당자: 현아 -> 나영
// 홈화면에서 특정 동아리 클릭 시 진입하는 동아리의 Mozip 홈화면 컴포넌트입니다.

const CustomBoxWithShadow = styled(CustomBox)`
	width: 20rem;
	height: 10rem;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1);
	border-radius: 1rem;
	padding: 1rem;
	background-color: white;
`;

export default function MozipProgressButton() {

	return (

		<CustomButton $width='auto' $height='auto' $padding='0' $backgroundColor="transparent">
			<CustomBoxWithShadow>
				<CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="center">
					<CustomFont $color='#5B5B5B' $font='1rem' $fontweight="bold">모집제목최대15자</CustomFont>
				</CustomColumn>
				<CustomRow $width="100%" $alignitems="center" $justifycontent="flex-start">
					<BsDot style={{ color: '#5B5B5B' }} />
					<CustomFont $color='#5B5B5B'>한줄최대30글자</CustomFont>
				</CustomRow>
				<CustomRow $width="100%" $alignitems="center" $justifycontent="flex-start" $gap='0.5rem'>
					<BsDot style={{ color: '#5B5B5B' }} />
					<CustomFont $color='#5B5B5B'>157</CustomFont>
					<CustomFont $color='#5B5B5B'>(지원자)</CustomFont>
					<CustomFont $color='#5B5B5B'>/</CustomFont>
					<CustomFont $color='#5B5B5B'>17</CustomFont>
					<CustomFont $color='#5B5B5B'>(합격자)</CustomFont>
				</CustomRow>
				<CustomRow $width="100%" $alignitems="center" $justifycontent="flex-end">
					<CustomFont $color='#AAAAAA'>1일 전 최종수정</CustomFont>
				</CustomRow>
			</CustomBoxWithShadow>
		</CustomButton>
	);
}
