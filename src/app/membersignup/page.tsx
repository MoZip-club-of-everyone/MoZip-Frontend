"use client";

// 회원가입 화면
// 담당자(담당 브랜치): hyuna -> nayeong
import { useState } from "react";
import styled from "styled-components";
import CustomColumn from "@/components/CustomColumn";
import CustomBox from "@/components/CustomBox";
import CustomButton from "@/components/CustomButton";
import MozipBlockInput from "../mozipFormCreate/components/MozipBlockInput";
import CustomFont from "@/components/CustomFont";
import CustomRow from "@/components/CustomRow";
import postJoin from "@/api/post/postJoin";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import mainLogo from '@/assets/logo/mainLogo.svg';


const CustomBoxWithShadow = styled(CustomBox)`
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1);
	border-radius: 1rem;
`;

const CustomFontWithLine = styled(CustomFont)`
	text-decoration: underline;
`;

export default function Signup() {
	const router = useRouter();
	
	// 상태 관리
	const [password, setPassword] = useState('');
	const [realname, setRealname] = useState('');
	const [email, setEmail] = useState('');
	const [phone1, setPhone1] = useState('');
	const [phone2, setPhone2] = useState('');
	const [phone3, setPhone3] = useState('');
	
	// 에러 메시지 상태
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [realnameError, setRealnameError] = useState('');
	const [phoneError, setPhoneError] = useState('');

	// 이메일 유효성 검사
	const validateEmail = (value: string) => {
		if (!value) {
			return '이메일을 입력해주세요.';
		}
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(value)) {
			return '올바른 이메일 형식이 아닙니다.';
		}
		return '';
	};

	// 비밀번호 유효성 검사
	const validatePassword = (value: string) => {
		if (!value) {
			return '비밀번호를 입력해주세요.';
		}
		return '';
	};

	// 이름 유효성 검사
	const validateRealname = (value: string) => {
		if (!value) {
			return '이름을 입력해주세요.';
		}
		if (value.length < 2 || value.length >= 16) {
			return '이름은 2자 이상 16자 미만이어야 합니다.';
		}
		return '';
	};

	// 전화번호 유효성 검사
	const validatePhone = (p1: string, p2: string, p3: string) => {
		if (!p1 || !p2 || !p3) {
			return '전화번호를 모두 입력해주세요.';
		}
		if (!/^\d{3}$/.test(p1) || !/^\d{4}$/.test(p2) || !/^\d{4}$/.test(p3)) {
			return '올바른 전화번호 형식이 아닙니다.';
		}
		return '';
	};

	// 입력값 변경 핸들러
	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setEmail(value);
		setEmailError(validateEmail(value));
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setPassword(value);
		setPasswordError(validatePassword(value));
	};

	const handleRealnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setRealname(value);
		setRealnameError(validateRealname(value));
	};

	const handlePhone1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.slice(0, 3); // 최대 3자리
		if (/^\d*$/.test(value)) { // 숫자만 허용
			setPhone1(value);
			setPhoneError(validatePhone(value, phone2, phone3));
		}
	};

	const handlePhone2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.slice(0, 4); // 최대 4자리
		if (/^\d*$/.test(value)) { // 숫자만 허용
			setPhone2(value);
			setPhoneError(validatePhone(phone1, value, phone3));
		}
	};

	const handlePhone3Change = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.slice(0, 4); // 최대 4자리
		if (/^\d*$/.test(value)) { // 숫자만 허용
			setPhone3(value);
			setPhoneError(validatePhone(phone1, phone2, value));
		}
	};

	// const handleSignup = async () => {
	// 	// 입력 검증
	// 	if (!password || !realname || !email || !phone1 || !phone2 || !phone3) {
	// 		setError('모든 필드를 입력해주세요.');
	// 		return;
	// 	}

	// 	// 전화번호 포맷팅
	// 	const formattedPhone = `${phone1}-${phone2}-${phone3}`;

	// 	const userData = {
	// 		password: password,
	// 		realname: realname,
	// 		email: email,
	// 		phone: formattedPhone,
	// 	};
	const handleSignup = async () => {
		// 모든 필드 검증
		const emailValidation = validateEmail(email);
		const passwordValidation = validatePassword(password);
		const realnameValidation = validateRealname(realname);
		const phoneValidation = validatePhone(phone1, phone2, phone3);

		// 에러 메시지 업데이트
		setEmailError(emailValidation);
		setPasswordError(passwordValidation);
		setRealnameError(realnameValidation);
		setPhoneError(phoneValidation);

		// 검증 실패시 리턴
		if (emailValidation || passwordValidation || realnameValidation || phoneValidation) {
			return;
		}

		const formattedPhone = `${phone1}-${phone2}-${phone3}`;
		const userData = {
			password,
			realname,
			email,
			phone: formattedPhone,
		};

		console.log("회원가입 데이터:", userData); // 리퀘스트 데이터

		// 여기
		try {
			const response = await postJoin(userData);
			// 성공 시 처리
			// console.log(response.data)
			console.log('회원가입 성공:', response);
			
			alert('회원가입이 완료되었습니다.');
			router.push('/memberlogin'); // 로그인 페이지로 이동
		} catch (error: any) {
			// 오류 처리
			if (error.response?.data === "이미 존재하는 아이디입니다.") {
				setEmailError('이미 존재하는 아이디입니다.');
			} else {
				alert('회원가입 중 오류가 발생했습니다.');
			}
		}
	};

	return (
		<CustomColumn $width="100%" $height='100vh' $alignitems="center" $justifycontent="center">
			<CustomBoxWithShadow $width='30%' $height='auto' $backgroundcolor="white" $gap='2rem' $padding="3rem">
				<Image src={mainLogo} alt="Logo" width={72} height={72} />

				<CustomColumn $width="80%" $alignitems="center" $justifycontent="center">
					<CustomRow $width='100%' $alignitems="center" $justifycontent="flex-start">
						<CustomFont $color="black" $font="1.7rem" $fontweight="bold">회원가입</CustomFont>
					</CustomRow>

					{/* {error && (
						<CustomFont $color="red" $font="1rem">
							{error}
						</CustomFont>
					)} */}

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
								value={email}
								onChange={handleEmailChange}
								// onChange={(e) => setEmail(e.target.value)}
							/>
							{emailError && (
								<CustomFont $color="#FF4949" $font="0.8rem">
									{emailError}
								</CustomFont>
							)}
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
								value={password}
								type="password"
								// onChange={(e) => setPassword(e.target.value)}
								onChange={handlePasswordChange}
							/>
							{passwordError && (
								<CustomFont $color="#FF4949" $font="0.8rem">
									{passwordError}
								</CustomFont>
							)}
						</CustomColumn>

						<CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="center" $gap='0.5rem'>
							<CustomRow $width="100%" $alignitems="center" $justifycontent="flex-start" $gap='0.5rem'>
								<CustomFont $color='#363636' $font='1rem'>이름</CustomFont>
								<CustomFont $color='red' $font='1rem'>*</CustomFont>
							</CustomRow>
							<MozipBlockInput
								$placeholder="이름 (2~15자)"
								$highlightcolor="#8BB9FF"
								$width="100%"
								$height="3rem"
								value={realname}
								// onChange={(e) => setRealname(e.target.value)}
								onChange={handleRealnameChange}
							/>
							{realnameError && (
								<CustomFont $color="#FF4949" $font="0.8rem">
									{realnameError}
								</CustomFont>
							)}
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
									// onChange={(e) => setPhone1(e.target.value)}
									onChange={handlePhone1Change}
									maxLength={3}
								/>
								<CustomFont $color='#AAAAAA'>-</CustomFont>
								<MozipBlockInput
									$placeholder=""
									$highlightcolor="#8BB9FF"
									$width="30%"
									$height="3rem"
									value={phone2}
									// onChange={(e) => setPhone2(e.target.value)}
									onChange={handlePhone2Change}
									maxLength={4}
								/>
								<CustomFont $color='#AAAAAA'>-</CustomFont>
								<MozipBlockInput
									$placeholder=""
									$highlightcolor="#8BB9FF"
									$width="30%"
									$height="3rem"
									value={phone3}
									// onChange={(e) => setPhone3(e.target.value)}
									onChange={handlePhone3Change}
									maxLength={4}
								/>
							</CustomRow>
							{phoneError && (
								<CustomFont $color="#FF4949" $font="0.8rem">
									{phoneError}
								</CustomFont>
							)}
						</CustomColumn>
					</CustomColumn>

					<CustomButton 
						$width='100%' 
						$alignItems="center"
						$justifyContent="center" 
						$backgroundColor="#5296FF"
						onClick={handleSignup}
					>
						<CustomFont $color='white' $font='1.3em' $fontweight="bold">회원가입</CustomFont>
					</CustomButton>
				</CustomColumn>
			</CustomBoxWithShadow>
		</CustomColumn>
	);
}
