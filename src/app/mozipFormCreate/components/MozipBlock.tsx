"use client";

import React from "react";
import styled from "styled-components";
import CustomBox from "@/components/CustomBox";
import CustomDivider from "@/components/CustomDivider";

// 담당자: 나영
// Figma 디자인에서, 모집 생성 시 모든 문항이 들어갈 블록 컴포넌트입니다.
// 11.5 23:00 기준 수정 필요한 컴포넌트입니다

const CustomBoxWithMinHeight = styled(CustomBox)`
  min-height: 20rem;
  max-height: 30rem;
`;

export default function MozipBlock({ children }: React.PropsWithChildren<{}>) {
	return (
		<CustomBoxWithMinHeight
			$width="100%"
			$flexdirection="row"
			$alignitems="center"
			$justifycontent="flex-start"
			$backgroundcolor="white"
			$padding="0"
		>
			<CustomDivider $backgroundcolor="#8BB9FF" $width="10px" $height="100%" $borderradius="0" />
			{children}
		</CustomBoxWithMinHeight>
	);
}
