"use client";

// 로그인 화면의 전화번호 인증 컴포넌트입니다.
// 담당자(담당 브랜치): hyuna -> nayeong
import React, { useState, useEffect } from "react";
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
import deleteIdCodeCheck from "@/api/delete/deleteIdCodeCheck";
import postCodeSend from "@/api/post/postCodeSend";

// 타이머 표시를 위한 스타일 컴포넌트
const TimerText = styled(CustomFont)`
  position: absolute;
  right: 610px;
  top: 510px; 
  //top: 64%;
  transform: translateY(-50%);
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

interface CertificateProps {
	setCurrentView: (view: "login" | "certificate" | "findID" | "findPW") => void;
	currentView: "findID" | "findPW";  // 현재 어떤 인증을 처리하는지 구분하기 위해 추가
}

export default function Certificate({ currentView, setCurrentView }: CertificateProps) {
	const router = useRouter();

	const [name, setName] = useState('')
	const [code, setCode] = useState('');
	const [phone1, setPhone1] = useState('');
	const [phone2, setPhone2] = useState('');
	const [phone3, setPhone3] = useState('');
	const [isCodeSent, setIsCodeSent] = useState(false);
	const [timeLeft, setTimeLeft] = useState(300); // 5분 = 300초
	const [timerActive, setTimerActive] = useState(false);
	const [buttonState, setButtonState] = useState({
	  sendCode: false,
	  verify: false
	});
	const formattedPhone = `${phone1}-${phone2}-${phone3}`;
	
	//버튼 활성화 조건 검사를 위한 변수 추가
	const isValidPhoneNumber = phone1.length > 0 && phone2.length > 0 && phone3.length > 0;
	const canSendCode = name.length > 0 && isValidPhoneNumber && !timerActive;
  	const canVerifyCode = isCodeSent && code.length > 0 && timerActive;

	// 타이머 관리
	useEffect(() => {
		let interval: NodeJS.Timeout;
		
		if (timerActive && timeLeft > 0) {
		  interval = setInterval(() => {
			setTimeLeft((prevTime) => prevTime - 1);
		  }, 1000);
		} else if (timeLeft === 0) {
		  setTimerActive(false);
		  setIsCodeSent(false);
		  setCode('');  // 입력된 인증번호 초기화
		}
	
		return () => {
		  if (interval) {
			clearInterval(interval);
		  }
		};
	  }, [timerActive, timeLeft]);
	
	// 타이머 포맷팅 (mm:ss)
	const formatTime = (seconds: number) => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
	};
	
	// 인증번호 발송
	const handleCodeSend = async () => {
		const Request = {
			name,
			phone: formattedPhone
		};
		console.log('리퀘스트 바디: ', Request);

		try {
			const response = await postCodeSend(Request);
			console.log('휴대폰 인증 번호 발송 성공: ', response)
			setIsCodeSent(true);
			setTimerActive(true);
			setTimeLeft(300); // 타이머 리셋
			alert('휴대폰 인증 번호가 발송되었습니다! 문자 메시지를 확인해주세요.')
		} catch (error) {
			alert("인증에 실패하였습니다.")
		}
	}

	// 인증 완료 버튼에
	const handleCertificate = async () => {
		// const formattedPhone = `${phone1}-${phone2}-${phone3}`;

		const Request = {
			phone: formattedPhone,
    		code,
		}
		console.log("리퀘스트 바디: ", Request);

		try {
			// const currentPath = window.location.pathname;
     		// let response;
			if (currentView === "findID") {
				const response = await deleteIdCodeCheck(Request);
				console.log('ID 인증 성공: ', response);
				alert("인증이 완료되었습니다.");
				localStorage.setItem("userName", name)
				localStorage.setItem("findId", response.email)
				setCurrentView("findID");
			} else if (currentView === "findPW") {
				const response = await deletePwCodeCheck(Request);
				console.log('PW 인증 성공: ', response);
				alert("인증이 완료되었습니다.");
				localStorage.setItem("userId", response.user_id);
				localStorage.setItem("accessToken", response.access_token);
				setCurrentView("findPW");
			}
			
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
							value={name}
							onChange={(e) => setName(e.target.value)}
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
						{timerActive && (
							<TimerText $color='#FF0000' $font='1rem'>
							{formatTime(timeLeft)}
							</TimerText>
						)}
					</CustomColumn>
				</CustomColumn>

				<CustomButton 
					$width='100%' 
					$alignItems="center"
					$justifyContent="center" 
					$backgroundColor={canSendCode ? "#5296FF" : "#CCCCCC"}
					onClick={handleCodeSend}
					disabled={!canSendCode}
					style={{ cursor: canSendCode ? 'pointer' : 'not-allowed' }}
				>
					<CustomFont $color='white' $font='1.3em' $fontweight="bold">인증번호 발송</CustomFont>
				</CustomButton>
				<CustomButton 
					$width='100%'
					$alignItems="center" 
					$justifyContent="center" 
					$backgroundColor={canVerifyCode ? "#5296FF" : "#CCCCCC"}
					onClick={handleCertificate}
					disabled={!canVerifyCode}
					style={{ cursor: canVerifyCode ? 'pointer' : 'not-allowed' }}
					>
					<CustomFont $color='white' $font='1.3em' $fontweight="bold">인증 완료</CustomFont>
				</CustomButton>
			</CustomColumn>
		</>
	);
}
