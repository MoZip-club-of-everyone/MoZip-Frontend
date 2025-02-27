"use client";

// 로그인 화면의 비밀번호 찾은 컴포넌트입니다.
// 담당자(담당 브랜치): hyuna -> nayeong

import CustomColumn from "@/components/CustomColumn";
import CustomButton from "@/components/CustomButton";
import MozipBlockInput from "@/app/mozipFormCreate/components/MozipBlockInput";
import CustomFont from "@/components/CustomFont";
import CustomRow from "@/components/CustomRow";
import Image from 'next/image';
import mainLogo from '@/assets/logo/mainLogo.svg';

interface FindPWProps {
	setCurrentView: (view: "login" | "certificate" | "findID" | "findPW") => void;
}

export default function FindPW({ setCurrentView }: FindPWProps) {
	return (
		<>
			{/* <CustomButton $width="auto" $backgroundColor="white" $border="1px solid black">
				<CustomFont $color="black" $font="1rem">LOGO</CustomFont>
			</CustomButton> */}
			<Image src={mainLogo} alt="Logo" width={72} height={72} />

			<CustomColumn $width="80%" $alignitems="center" $justifycontent="center">
				<CustomRow $width="100%" $alignitems="center" $justifycontent="flex-start">
					<CustomFont $color="black" $font="1.7rem" $fontweight="bold">비밀번호 재설정</CustomFont>
				</CustomRow>

				<CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="center" $gap="1rem">
					<CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="center" $gap="0.5rem">
						<CustomRow $width="100%" $alignitems="center" $justifycontent="flex-start" $gap="0.5rem">
							<CustomFont $color="#363636" $font="1rem">신규 비밀번호</CustomFont>
							<CustomFont $color="red" $font="1rem">*</CustomFont>
						</CustomRow>
						<MozipBlockInput
							$placeholder="비밀번호 입력"
							$highlightcolor="#8BB9FF"
							$width="100%"
							$height="3rem"
						/>
					</CustomColumn>

					<CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="center" $gap="0.5rem">
						<CustomRow $width="100%" $alignitems="center" $justifycontent="flex-start" $gap="0.5rem">
							<CustomFont $color="#363636" $font="1rem">비밀번호 확인</CustomFont>
							<CustomFont $color="red" $font="1rem">*</CustomFont>
						</CustomRow>
						<MozipBlockInput
							$placeholder="비밀번호 확인"
							$highlightcolor="#8BB9FF"
							$width="100%"
							$height="3rem"
						/>
					</CustomColumn>
				</CustomColumn>

				<CustomButton
					$width="100%"
					$alignItems="center"
					$justifyContent="center"
					$backgroundColor="#5296FF"
					onClick={() => {
						alert("비밀번호 변경이 완료되었습니다. 다시 로그인해주세요.");
						setCurrentView("login");
					}}
				>
					<CustomFont $color="white" $font="1.3em" $fontweight="bold">확인</CustomFont>
				</CustomButton>
			</CustomColumn>
		</>
	);
}
