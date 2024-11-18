"use client";

// 로그인 화면
// 담당자(담당 브랜치): hyuna -> nayeong

import styled from "styled-components";
import CustomColumn from "@/components/CustomColumn";
import CustomBox from "@/components/CustomBox";
import CustomButton from "@/components/CustomButton";
import MozipBlockInput from "../mozipFormCreate/components/MozipBlockInput";
import CustomFont from "@/components/CustomFont";
import CustomRow from "@/components/CustomRow";

const CustomBoxWithShadow = styled(CustomBox)`
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1);
	border-radius: 1rem;
`;

const CustomFontWithLine = styled(CustomFont)`
	text-decoration: underline;
`;

export default function LogIn() {
	return (
		<CustomColumn $width="100%" $height='100vh' $alignitems="center" $justifycontent="center">
			<CustomBoxWithShadow $width='30%' $height='70vh' $backgroundcolor="white" $gap='4rem'>
				<CustomButton $width='auto' $backgroundColor="white" $border="1px solid black">
					<CustomFont $color="black" $font="1rem">LOGO</CustomFont>
				</CustomButton>

				<CustomColumn $width="80%" $alignitems="center" $justifycontent="center">
					<CustomRow $width='100%' $alignitems="center" $justifycontent="flex-start">
						<CustomFont $color="black" $font="1.7rem" $fontweight="bold">로그인</CustomFont>
					</CustomRow>

					<CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="center" $gap='1rem'>
						<CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="center" $gap='0.5rem'>
							<CustomFont $color='#363636' $font='1rem'>이메일</CustomFont>
							<MozipBlockInput
								$placeholder="이메일"
								$highlightcolor="#8BB9FF"
								$width="100%"
								$height="3rem"
							/>
						</CustomColumn>

						<CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="center" $gap='0.5rem'>
							<CustomFont $color='#363636' $font='1rem'>비밀번호</CustomFont>
							<MozipBlockInput
								$placeholder="비밀번호"
								$highlightcolor="#8BB9FF"
								$width="100%"
								$height="3rem"
							/>
						</CustomColumn>
					</CustomColumn>

					<CustomRow $width='100%' $alignitems="center" $justifycontent="flex-end">
						<CustomButton $backgroundColor="transparent" $width='auto' $height='auto' $padding='0'>
							<CustomFontWithLine $color='#999999' $font='0.8rem'>아이디 찾기</CustomFontWithLine>
						</CustomButton>
						<CustomButton $backgroundColor="transparent" $width='auto' $height='auto' $padding='0'>
							<CustomFontWithLine $color='#999999' $font='0.8rem'>비밀번호 찾기</CustomFontWithLine>
						</CustomButton>
					</CustomRow>

					<CustomRow $width='100%' $alignitems="center" $justifycontent="flex-end">
						<CustomFont $color='#999999' $font='0.8rem'>MoZip이 처음이신가요?</CustomFont>
						<CustomButton $backgroundColor="#F2F2F2" $padding='0.5rem' $width='auto' $height='auto'>
							<CustomFont $color='#999999' $font='0.8rem'>
								회원가입
							</CustomFont>
						</CustomButton>
					</CustomRow>

					<CustomButton $width='100%' $alignItems="center" $justifyContent="center" $backgroundColor="#5296FF">
						<CustomFont $color='white' $font='1.3em' $fontweight="bold">로그인</CustomFont>
					</CustomButton>
				</CustomColumn>
			</CustomBoxWithShadow>
		</CustomColumn>
	);
}
