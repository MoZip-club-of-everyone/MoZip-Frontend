"use client";

// 로그인 화면의 기본 컴포넌트입니다.
// 담당자(담당 브랜치): hyuna -> nayeong

import styled from "styled-components";
import CustomColumn from "@/components/CustomColumn";
import CustomButton from "@/components/CustomButton";
import MozipBlockInput from "@/app/mozipFormCreate/components/MozipBlockInput";
import CustomFont from "@/components/CustomFont";
import CustomRow from "@/components/CustomRow";

const CustomFontWithLine = styled(CustomFont)`
	text-decoration: underline;
`;

interface DefaultLoginProps {
	setCurrentView: (view: "login" | "certificate" | "findID" | "findPW") => void;
	setNextView: (view: "findID" | "findPW") => void;
}

export default function DefaultLogin({ setCurrentView, setNextView }: DefaultLoginProps) {
	return (
		<>
			<CustomButton $width="auto" $backgroundColor="white" $border="1px solid black">
				<CustomFont $color="black" $font="1rem">
					LOGO
				</CustomFont>
			</CustomButton>

			<CustomColumn $width="80%" $alignitems="center" $justifycontent="center">
				<CustomRow $width="100%" $alignitems="center" $justifycontent="flex-start">
					<CustomFont $color="black" $font="1.7rem" $fontweight="bold">
						로그인
					</CustomFont>
				</CustomRow>

				<CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="center" $gap="1rem">
					<CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="center" $gap="0.5rem">
						<CustomFont $color="#363636" $font="1rem">
							이메일
						</CustomFont>
						<MozipBlockInput
							$placeholder="이메일"
							$highlightcolor="#8BB9FF"
							$width="100%"
							$height="3rem"
						/>
					</CustomColumn>

					<CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="center" $gap="0.5rem">
						<CustomFont $color="#363636" $font="1rem">
							비밀번호
						</CustomFont>
						<MozipBlockInput
							$placeholder="비밀번호"
							$highlightcolor="#8BB9FF"
							$width="100%"
							$height="3rem"
						/>
					</CustomColumn>
				</CustomColumn>

				<CustomRow $width="100%" $alignitems="center" $justifycontent="flex-end">
					<CustomButton
						$backgroundColor="transparent"
						$width="auto"
						$height="auto"
						$padding="0"
						onClick={() => {
							setCurrentView("certificate");
							setNextView("findID");
						}}
					>
						<CustomFontWithLine $color="#999999" $font="0.8rem">
							아이디 찾기
						</CustomFontWithLine>
					</CustomButton>
					<CustomButton
						$backgroundColor="transparent"
						$width="auto"
						$height="auto"
						$padding="0"
						onClick={() => {
							setCurrentView("certificate");
							setNextView("findPW");
						}}
					>
						<CustomFontWithLine $color="#999999" $font="0.8rem">
							비밀번호 찾기
						</CustomFontWithLine>
					</CustomButton>
				</CustomRow>

				<CustomRow $width="100%" $alignitems="center" $justifycontent="flex-end">
					<CustomFont $color="#999999" $font="0.8rem">
						MoZip이 처음이신가요?
					</CustomFont>
					<CustomButton $backgroundColor="#F2F2F2" $padding="0.5rem" $width="auto" $height="auto">
						<CustomFont $color="#999999" $font="0.8rem">
							회원가입
						</CustomFont>
					</CustomButton>
				</CustomRow>

				<CustomButton $width="100%" $alignItems="center" $justifyContent="center" $backgroundColor="#5296FF">
					<CustomFont $color="white" $font="1.3em" $fontweight="bold">
						로그인
					</CustomFont>
				</CustomButton>
			</CustomColumn>
		</>
	);
}
