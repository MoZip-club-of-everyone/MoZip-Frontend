"use client";

import React from "react";
import CustomButton from "@/components/CustomButton";
import CustomFont from "@/components/CustomFont";

// 담당자: 나영
// 11.5 23:00시 기준 수정 필요한 컴포넌트입니다.

export default function MozipFormButton({ children }: React.PropsWithChildren<{}>) {
	return (
		<CustomButton
			$width="100%"
			$alignItems="center"
			$justifyContent="center"
			$backgroundColor="#8BB9FF"
			$flexDirection="row"
			$gap={'0.5rem'}
			$padding="1rem"
		>
			<CustomFont $color="white" $font="1rem">+</CustomFont>
			<CustomFont $color="white" $font="1rem">
				{children}
			</CustomFont>
		</CustomButton>
	);
}
