"use client";

// 로그인 화면의 전화번호 인증 컴포넌트입니다.
// 담당자(담당 브랜치): hyuna -> nayeong
import React, { useState } from "react";
import styled from "styled-components";
import CustomColumn from "@/components/CustomColumn";
import CustomButton from "@/components/CustomButton";
import MozipBlockInput from "@/app/mozipFormCreate/components/MozipBlockInput";
import CustomFont from "@/components/CustomFont";
import CustomRow from "@/components/CustomRow";
import Image from 'next/image';
import mainLogo from '@/assets/logo/mainLogo.svg';
import deletePwCodeCheck from "@/api/delete/deletePwCodeCheck";
import { useRouter } from "next/navigation";

interface CertificateProps {
	setCurrentView: (view: "login" | "certificate" | "findID" | "findPW") => void;
}

export default function Certificate({ setCurrentView }: CertificateProps) {
	const router = useRouter();

	const [code, setCode] = useState('');
	const [phone1, setPhone1] = useState('');
	const [phone2, setPhone2] = useState('');
	const [phone3, setPhone3] = useState('');
	//인증 완료 버튼에
	const handleCertificate = async () => {
		const formattedPhone = `${phone1}-${phone2}-${phone3}`;

		const Request = {
			phone: formattedPhone,
    		code,
		}
		console.log("리퀘스트 바디: ", Request);

		try {
			const response = await deletePwCodeCheck(Request);
			console.log('인증 성공: ', response)
			alert("인증이 완료되었습니다.");
			localStorage.setItem("userId", response.user_id)
			localStorage.setItem("accessToken", response.access_token)
			setCurrentView("findPW"); // 인증 성공 시 FindPW 컴포넌트로 전환
			// setNextView: (view: "findPW") => void;
		} catch (error: any) {
			alert("인증에 실패하였습니다.")
		}
	}

	return (
		<>
			{/* <CustomButton $width='auto' $backgroundColor="white" $border="1px solid black">
				<CustomFont $color="black" $font="1rem">LOGO</CustomFont>
			</CustomButton> */}
			<Image src={mainLogo} alt="Logo" width={72} height={72} />

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
								value={phone1}
								onChange={(e) => setPhone1(e.target.value)}
							/>
							<CustomFont $color='#AAAAAA'>-</CustomFont>
							<MozipBlockInput
								$placeholder=""
								$highlightcolor="#8BB9FF"
								$width="30%"
								$height="3rem"
								value={phone2}
								onChange={(e) => setPhone2(e.target.value)}
							/>
							<CustomFont $color='#AAAAAA'>-</CustomFont>
							<MozipBlockInput
								$placeholder=""
								$highlightcolor="#8BB9FF"
								$width="30%"
								$height="3rem"
								value={phone3}
								onChange={(e) => setPhone3(e.target.value)}
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
							value={code}
							onChange={(e) => setCode(e.target.value)}
						/>
					</CustomColumn>
				</CustomColumn>

				<CustomButton $width='100%' $alignItems="center" $justifyContent="center" $backgroundColor="#5296FF">
					<CustomFont $color='white' $font='1.3em' $fontweight="bold">인증번호 발송</CustomFont>
				</CustomButton>
				<CustomButton $width='100%' $alignItems="center" $justifyContent="center" $backgroundColor="#5296FF"
					onClick={handleCertificate}
					// onClick={() => {
					// 	alert("인증이 완료되었습니다.");
					// 	onComplete();
					// }}
					>
					<CustomFont $color='white' $font='1.3em' $fontweight="bold">인증 완료</CustomFont>
				</CustomButton>
			</CustomColumn>
		</>
	);
}
