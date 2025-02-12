"use client";

import styled from "styled-components";
import CustomFont from "@/components/CustomFont";
import CustomDivider from "@/components/CustomDivider";
import CustomRow from "@/components/CustomRow";
import CustomColumn from "@/components/CustomColumn";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "next/navigation";

import Image from 'next/image';
import headerLogo from '@/assets/logo/headerLogo.svg';
import StyledImg from "@/components/StyledImg";

// 담당자: 나영
// Figma : 모집폼 관리 > 상단 header 파일입니다.

const CustomHeader = styled(CustomColumn)`
  padding-top: 3vh;
`;

export default function Header() {
	const router = useRouter();

	const GoMain = () => {
		router.push("/homepage");
	}

	return (
		<CustomHeader $width="100%" $gap="0" $alignitems="flex-end">
			<CustomRow $width="90%" $padding="0.5rem" $justifycontent="flex-start" $alignitems="center">
				<CustomButton $width='auto' $backgroundColor="transparent" $padding="1rem" onClick={GoMain}>
					{/* <StyledImg src={headerLogo} width='4rem' /> */}
					<Image src={headerLogo} alt='logo' />
				</CustomButton>
			</CustomRow>
			<CustomDivider $width="100%" $height="1px" $backgroundcolor="#D8D8D8" />
		</CustomHeader>
	);
}
