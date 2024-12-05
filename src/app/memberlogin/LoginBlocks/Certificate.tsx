"use client";

// 로그인 화면의 전화번호 인증 컴포넌트입니다.
// 담당자(담당 브랜치): hyuna -> nayeong

import styled from "styled-components";
import CustomColumn from "@/components/CustomColumn";
import CustomButton from "@/components/CustomButton";
import MozipBlockInput from "@/app/mozipFormCreate/components/MozipBlockInput";
import CustomFont from "@/components/CustomFont";
import CustomRow from "@/components/CustomRow";

interface CertificateProps {
	onComplete: () => void;
}

export default function Certificate({ onComplete }: CertificateProps) {
	return (
		<>
			<CustomButton $width='auto' $backgroundColor="white" $border="1px solid black">
				<CustomFont $color="black" $font="1rem">LOGO</CustomFont>
			</CustomButton>

			<CustomColumn $width="80%" $alignitems="center" $justifycontent="center">
				<CustomRow $width='100%' $alignitems="center" $justifycontent="flex-start">
					<CustomFont $color="black" $font="1.7rem" $fontweight="bold">본인 휴대폰 인증</CustomFont>
				</CustomRow>

				<CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="center" $gap='1rem'>
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

					<CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="center" $gap='0.5rem'>
						<CustomRow $width="100%" $alignitems="center" $justifycontent="flex-start" $gap='0.5rem'>
							<CustomFont $color='#363636' $font='1rem'>인증번호</CustomFont>
							<CustomFont $color='red' $font='1rem'>*</CustomFont>
						</CustomRow>
						<MozipBlockInput
							$placeholder="123456"
							$highlightcolor="#8BB9FF"
							$width="100%"
							$height="3rem"
						/>
					</CustomColumn>
				</CustomColumn>

				<CustomButton $width='100%' $alignItems="center" $justifyContent="center" $backgroundColor="#5296FF">
					<CustomFont $color='white' $font='1.3em' $fontweight="bold">인증번호 발송</CustomFont>
				</CustomButton>
				<CustomButton $width='100%' $alignItems="center" $justifyContent="center" $backgroundColor="#5296FF"
					onClick={() => {
						alert("인증이 완료되었습니다.");
						onComplete();
					}}>
					<CustomFont $color='white' $font='1.3em' $fontweight="bold">인증 완료</CustomFont>
				</CustomButton>
			</CustomColumn>
		</>
	);
}
