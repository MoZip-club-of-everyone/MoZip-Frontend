"use client";

import { useRecoilState } from "recoil";
import { loginState } from "@/recoil/loginState";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import CustomFont from "@/components/CustomFont";
import CustomDivider from "@/components/CustomDivider";
import CustomRow from "@/components/CustomRow";
import CustomColumn from "@/components/CustomColumn";
import CustomButton from "@/components/CustomButton";
import Image from 'next/image';
import headerLogo from '@/assets/logo/headerLogo.svg';

const CustomHeader = styled(CustomColumn)`
	padding-top: 3vh;
`;

interface HomeHeaderProps {
	setActiveTab: (tab: string) => void;
}

export default function HomeHeader({ setActiveTab }: HomeHeaderProps) {
	const router = useRouter();
	const [loginStateValue, setLoginState] = useRecoilState(loginState);

	const handleAuthClick = () => {
		if (loginStateValue.isLoggedIn) {
		  // 로그아웃 처리
		  setLoginState({
			isLoggedIn: false,
			userId: null
		  });
		  localStorage.removeItem('userId');
		  localStorage.removeItem('accessToken');
		} else {
		  router.push("/memberlogin");
		}
	  };

	return (
		<CustomHeader $width="100%" $gap="0" $alignitems="flex-end">
			<CustomRow $width="90%" $padding="0.5rem" $justifycontent="space-between" $alignitems="center">

				<CustomButton
					$width="auto"
					$backgroundColor="white"
					// $border="1px solid black"
					$padding="0"
					onClick={() => setActiveTab("동아리")} // '동아리'로 설정
				>
					<Image src={headerLogo} alt="Logo"/>
				</CustomButton>

				<CustomButton
					$width="auto"
					$backgroundColor="transparent"
					onClick={handleAuthClick}
				>
					<CustomFont $color="black" $font="0.8rem">{loginStateValue.isLoggedIn ? '로그아웃' : '로그인'}</CustomFont>
				</CustomButton>
			</CustomRow>
			<CustomDivider $width="100%" $height="1px" $backgroundcolor="#D8D8D8" />
		</CustomHeader>
	);
}
