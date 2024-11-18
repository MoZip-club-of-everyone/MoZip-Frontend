"use client";

// 회원가입 화면
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

export default function Signup() {
	return (
		<CustomColumn $width="100%" $height='100vh' $alignitems="center" $justifycontent="center">
			<CustomBoxWithShadow $width='30%' $height='80vh' $backgroundcolor="white" $gap='4rem'>
				<CustomButton $width='auto' $backgroundColor="white" $border="1px solid black">
					<CustomFont $color="black" $font="1rem">LOGO</CustomFont>
				</CustomButton>

				<CustomColumn $width="80%" $alignitems="center" $justifycontent="center">
					<CustomRow $width='100%' $alignitems="center" $justifycontent="flex-start">
						<CustomFont $color="black" $font="1.7rem" $fontweight="bold">회원가입</CustomFont>
					</CustomRow>

					<CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="center" $gap='1rem'>
						<CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="center" $gap='0.5rem'>
							<CustomRow $width="100%" $alignitems="center" $justifycontent="flex-start" $gap='0.5rem'>
								<CustomFont $color='#363636' $font='1rem'>이메일</CustomFont>
								<CustomFont $color='red' $font='1rem'>*</CustomFont>
							</CustomRow>
							<MozipBlockInput
								$placeholder="이메일"
								$highlightcolor="#8BB9FF"
								$width="100%"
								$height="3rem"
							/>
						</CustomColumn>

						<CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="center" $gap='0.5rem'>
							<CustomRow $width="100%" $alignitems="center" $justifycontent="flex-start" $gap='0.5rem'>
								<CustomFont $color='#363636' $font='1rem'>비밀번호</CustomFont>
								<CustomFont $color='red' $font='1rem'>*</CustomFont>
							</CustomRow>
							<MozipBlockInput
								$placeholder="비밀번호"
								$highlightcolor="#8BB9FF"
								$width="100%"
								$height="3rem"
							/>
						</CustomColumn>

						<CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="center" $gap='0.5rem'>
							<CustomRow $width="100%" $alignitems="center" $justifycontent="flex-start" $gap='0.5rem'>
								<CustomFont $color='#363636' $font='1rem'>이름</CustomFont>
								<CustomFont $color='red' $font='1rem'>*</CustomFont>
							</CustomRow>
							<MozipBlockInput
								$placeholder="이름"
								$highlightcolor="#8BB9FF"
								$width="100%"
								$height="3rem"
							/>
						</CustomColumn>

						<CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="center" $gap='0.5rem'>
							<CustomRow $width="100%" $alignitems="center" $justifycontent="flex-start" $gap='0.5rem'>
								<CustomFont $color='#363636' $font='1rem'>전화번호</CustomFont>
								<CustomFont $color='red' $font='1rem'>*</CustomFont>
							</CustomRow>
							<CustomRow $width="100%" $alignitems="center" $justifycontent="flex-start" $gap='0.5rem'>
								<MozipBlockInput
									$placeholder=""
									$highlightcolor="#8BB9FF"
									$width="30%"
									$height="3rem"
								/>
								<CustomFont $color='#AAAAAA'>-</CustomFont>
								<MozipBlockInput
									$placeholder=""
									$highlightcolor="#8BB9FF"
									$width="30%"
									$height="3rem"
								/>
								<CustomFont $color='#AAAAAA'>-</CustomFont>
								<MozipBlockInput
									$placeholder=""
									$highlightcolor="#8BB9FF"
									$width="30%"
									$height="3rem"
								/>
							</CustomRow>
						</CustomColumn>
					</CustomColumn>

					<CustomButton $width='100%' $alignItems="center" $justifyContent="center" $backgroundColor="#5296FF">
						<CustomFont $color='white' $font='1.3em' $fontweight="bold">회원가입</CustomFont>
					</CustomButton>
				</CustomColumn>
			</CustomBoxWithShadow>
		</CustomColumn>
	);
}
