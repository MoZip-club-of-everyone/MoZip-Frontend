"use client";

import styled from "styled-components";
import CustomFont from "@/components/CustomFont";
import CustomRow from "@/components/CustomRow";
import CustomButton from "@/components/CustomButton";
import CustomBox from "@/components/CustomBox";
import CustomColumn from "@/components/CustomColumn";
import { BsDot } from "react-icons/bs";

// Props 타입 정의
interface MozipProgressButtonProps {
	title: string;
	startDate: string;
	endDate: string;
}

const CustomBoxWithShadow = styled(CustomBox)`
	width: 20rem;
	height: 10rem;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1);
	border-radius: 1rem;
	padding: 1rem;
	background-color: white;
`;

export default function MozipProgressButton({ title, startDate, endDate }: MozipProgressButtonProps) {
	return (
		<CustomButton $width="auto" $height="auto" $padding="0" $backgroundColor="transparent">
			<CustomBoxWithShadow>
				<CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="center">
					<CustomFont $color="#5B5B5B" $font="1rem" $fontweight="bold">
						{title}
					</CustomFont>
				</CustomColumn>
				<CustomRow $width="100%" $alignitems="center" $justifycontent="flex-start">
					<BsDot style={{ color: "#5B5B5B" }} />
					<CustomFont $color="#5B5B5B">{startDate}</CustomFont>
				</CustomRow>
				<CustomRow $width="100%" $alignitems="center" $justifycontent="flex-start" $gap="0.5rem">
					<BsDot style={{ color: "#5B5B5B" }} />
					<CustomFont $color="#5B5B5B">{endDate}</CustomFont>
				</CustomRow>
				<CustomRow $width="100%" $alignitems="center" $justifycontent="flex-end">
					<CustomFont $color="#AAAAAA">1일 전 최종수정</CustomFont>
				</CustomRow>
			</CustomBoxWithShadow>
		</CustomButton>
	);
}
