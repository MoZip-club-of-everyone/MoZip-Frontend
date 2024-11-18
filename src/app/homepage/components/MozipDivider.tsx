"use client";

import styled from "styled-components";
import CustomFont from "@/components/CustomFont";

interface MozipDividerProps {
	text: string;
	hasAddNewMozip: boolean;
}

const DividerContainer = styled.div<{ color: string }>`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;

	&::before,
	&::after {
		content: "";
		flex: 1;
		border-top: 1px solid ${(props) => props.color};
		margin: 0 1rem;
	}
`;

export default function MozipDivider({ text, hasAddNewMozip }: MozipDividerProps) {
	const color = hasAddNewMozip ? "#5296FF" : "#AAAAAA";

	return (
		<DividerContainer color={color}>
			<CustomFont $color={color} $font="1rem">
				{text}
			</CustomFont>
		</DividerContainer>
	);
}
