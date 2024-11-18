"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";
import CustomFont from "@/components/CustomFont";
import CustomDivider from "@/components/CustomDivider";
import CustomRow from "@/components/CustomRow";
import CustomColumn from "@/components/CustomColumn";
import CustomButton from "@/components/CustomButton";

const CustomHeader = styled(CustomColumn)`
	padding-top: 3vh;
`;

interface HomeHeaderProps {
	setActiveTab: (tab: string) => void;
}

export default function HomeHeader({ setActiveTab }: HomeHeaderProps) {
	const router = useRouter();

	return (
		<CustomHeader $width="100%" $gap="0" $alignitems="flex-end">
			<CustomRow $width="90%" $padding="0.5rem" $justifycontent="space-between" $alignitems="center">

				<CustomButton
					$width="auto"
					$backgroundColor="white"
					$border="1px solid black"
					$padding="1rem"
					onClick={() => setActiveTab("동아리")} // '동아리'로 설정
				>
					<CustomFont $color="black" $font="1rem">LOGO</CustomFont>
				</CustomButton>

				<CustomButton
					$width="auto"
					$backgroundColor="transparent"
					onClick={() => router.push("/memberlogin")}
				>
					<CustomFont $color="black" $font="0.8rem">로그인</CustomFont>
				</CustomButton>
			</CustomRow>
			<CustomDivider $width="100%" $height="1px" $backgroundcolor="#D8D8D8" />
		</CustomHeader>
	);
}
