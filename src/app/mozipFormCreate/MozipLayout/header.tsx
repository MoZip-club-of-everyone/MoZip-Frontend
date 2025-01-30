"use client";

import styled from "styled-components";
import CustomFont from "@/components/CustomFont";
import CustomDivider from "@/components/CustomDivider";
import CustomRow from "@/components/CustomRow";
import CustomColumn from "@/components/CustomColumn";
import CustomButton from "@/components/CustomButton";

import headerLogo from '@/assets/logo/headerLogo.svg';
import StyledImg from "@/components/StyledImg";

// 담당자: 나영
// Figma : 모집폼 관리 > 상단 header 파일입니다.

const CustomHeader = styled(CustomColumn)`
  padding-top: 3vh;
`;

export default function Header() {

	return (
		<CustomHeader $width="100%" $gap="0" $alignitems="flex-end">
			<CustomRow $width="90%" $padding="0.5rem" $justifycontent="space-between" $alignitems="center">
				<CustomButton $width='auto' $backgroundColor="transparent" $padding="1rem">
					<StyledImg src={headerLogo} width='4rem' />
				</CustomButton>

				<CustomButton $width='auto' $backgroundColor="transparent">
					<CustomFont $color="black" $font="0.8rem">로그인</CustomFont>
				</CustomButton>
			</CustomRow>
			<CustomDivider $width="100%" $height="1px" $backgroundcolor="#D8D8D8" />
		</CustomHeader>
	);
}
