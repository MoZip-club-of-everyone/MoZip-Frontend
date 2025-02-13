"use client";

// 로그인 화면의 기본 컴포넌트입니다.
// 담당자(담당 브랜치): hyuna -> nayeong
import { useState } from "react";
import styled from "styled-components";
import { Eye, EyeOff } from "lucide-react"; // 아이콘 추가
import CustomColumn from "@/components/CustomColumn";
import CustomButton from "@/components/CustomButton";
import MozipBlockInput from "@/app/mozipFormCreate/components/MozipBlockInput";
import CustomFont from "@/components/CustomFont";
import CustomRow from "@/components/CustomRow";
import { useRouter } from "next/navigation";
import postLogin from "@/api/post/postLogin";
import Image from 'next/image';
import mainLogo from '@/assets/logo/mainLogo.svg';
import { useLoginStore } from "@/stores/useLoginStore";

const CustomFontWithLine = styled(CustomFont)`
	text-decoration: underline;
`;

// 비밀번호 입력 필드를 감싸는 컨테이너 스타일
const PasswordInputContainer = styled.div`
	position: relative;
	width: 100%;
`;

// 비밀번호 토글 버튼 스타일
const PasswordToggleButton = styled.button`
	position: absolute;
	right: 0.6rem;
	top: 50%;
	transform: translateY(-50%);
	background: none;
	border: none;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
`;

interface DefaultLoginProps {
	setCurrentView: (view: "login" | "certificate" | "findID" | "findPW") => void;
	setNextView: (view: "findID" | "findPW") => void;
}

export default function DefaultLogin({ setCurrentView, setNextView }: DefaultLoginProps) {
	const router = useRouter();
	const setLogin = useLoginStore(state => state.setLogin); //zustand

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [loginError, setLoginError] = useState('');
	const [showPassword, setShowPassword] = useState(false); // 비밀번호 표시 상태

	// const validateFields = () => {
	// 	let isValid = true;
	// 	setEmailError('');
	// 	setPasswordError('');
	// 	setLoginError('');
	
	// 	if (!email) {
	// 	  setEmailError('이메일을 입력해주세요.');
	// 	  isValid = false;
	// 	}
	
	// 	if (!password) {
	// 	  setPasswordError('비밀번호를 입력해주세요.');
	// 	  isValid = false;
	// 	}
	
	// 	return isValid;
	// };

	// const handleEmailBlur = () => {
	// 	if (!email) {
	// 		setEmailError('이메일을 입력해주세요.');
	// 	} else {
	// 		setEmailError('');
	// 	}
	// };

	// const handlePasswordBlur = () => {
	// 	if (!password) {
	// 		setPasswordError('비밀번호를 입력해주세요.');
	// 	} else {
	// 		setPasswordError('');
	// 	}
	// };

	// const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	setEmail(e.target.value);
	// 	setEmailError('');
	// };

	// const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	setPassword(e.target.value);
	// 	setPasswordError('');
	// };

	// 이메일 유효성 검사 함수
	const validateEmail = (value: string) => {
		if (!value) {
			return '이메일을 입력해주세요.';
		} 
		if (!/\S+@\S+\.\S+/.test(value)) {
			return '올바른 이메일 형식이 아닙니다.';
		}
		return '';
	};

	// 비밀번호 유효성 검사 함수
	const validatePassword = (value: string) => {
		if (!value) {
			return '비밀번호를 입력해주세요.';
		}
		return '';
	};

	// 이메일 입력 핸들러
	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setEmail(value);
		setEmailError(validateEmail(value));
	};

	// 비밀번호 입력 핸들러
	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setPassword(value);
		setPasswordError(validatePassword(value));
	};

	const handleLogin = async () => {
		// if (email === '') {
        //     alert('아이디를 입력하세요.');
        //     return;
        // }

        // if (password === '') {
        //     alert('비밀번호를 입력하세요.');
        //     return;
        // }

		// if (!validateFields()) {
		// 	return;
		// }

		// if (!email || !password) {
		// 	if (!email) setEmailError('이메일을 입력해주세요.');
		// 	if (!password) setPasswordError('비밀번호를 입력해주세요.');
		// 	return;
		// }

		// 최종 유효성 검사
		const emailValidation = validateEmail(email);
		const passwordValidation = validatePassword(password);

		if (emailValidation || passwordValidation) {
			setEmailError(emailValidation);
			setPasswordError(passwordValidation);
			return;
		}

		const userData = {
			email: email,
			password: password,
		};
		console.log('로그인 데이터: ', userData); // 리퀘스트 데이터
		
		try {
			const response = await postLogin(userData);
			console.log('로그인 성공:', response);

			// Zustand store 업데이트
			setLogin(response.userId, response.accessToken);

			router.push('/'); // 홈 페이지로 이동
		} catch (error: any) {
			console.error('에러: ', error.response);
			// setErrormessage('이메일 또는 비밀번호가 일치하지 않습니다.');
			setLoginError('이메일 또는 비밀번호가 일치하지 않습니다.');
			alert('로그인에 실패했습니다.');
		}
		

		// axios
		// 	.post('http://3.37.103.187/api/users/login', userData)
		// 	.then((response) => {
		// 		console.log('로그인이 완료되었습니다.');
		// 		router.push('/'); // 홈 페이지로 이동
		// 	})
		// 	.catch((error) => {
		// 		console.log('에러: ', error.response);
		// 	})
	};
	
	return (
		<>
			{/* <CustomButton $width="auto" $backgroundColor="white" $border="1px solid black">
				<CustomFont $color="black" $font="1rem">
					LOGO
				</CustomFont>
			</CustomButton> */}
			<Image src={mainLogo} alt="Logo" width={72} height={72} />

			<CustomColumn $width="80%" $alignitems="center" $justifycontent="center">
				<CustomRow $width="100%" $alignitems="center" $justifycontent="flex-start">
					<CustomFont $color="black" $font="1.7rem" $fontweight="bold">
						로그인
					</CustomFont>
				</CustomRow>

				<CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="center" $gap="1rem">
					{/* <CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="center" $gap="0.5rem">
						<CustomFont $color="#363636" $font="1rem">
							이메일
						</CustomFont>
						<MozipBlockInput
							$placeholder="이메일"
							$highlightcolor="#8BB9FF"
							$width="100%"
							$height="3rem"
						/>
					</CustomColumn> */}

					<CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="center" $gap="0.5rem">
						<CustomFont $color="#363636" $font="1rem">
							이메일
						</CustomFont>
						<MozipBlockInput
							$placeholder="이메일"
							$highlightcolor="#8BB9FF"
							$width="100%"
							$height="3rem"
							value={email}
							// onChange={(e) => setEmail(e.target.value)}
							// onChange={(e) => {
							// 	setEmail(e.target.value);
							// 	setEmailError('');
							// 	setLoginError('');
							// }}
							onChange={handleEmailChange}
							// onBlur={handleEmailBlur}
						/>
						{emailError && (
							<CustomFont $color="#FF4949" $font="0.8rem">
								{emailError}
							</CustomFont>
						)}
					</CustomColumn>

					<CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="center" $gap="0.5rem">
						<CustomFont $color="#363636" $font="1rem">
							비밀번호
						</CustomFont>
						<PasswordInputContainer>
							<MozipBlockInput
								type={showPassword ? "text" : "password"}
								$placeholder="비밀번호"
								$highlightcolor="#8BB9FF"
								$width="100%"
								$height="3rem"
								value={password}
								// onChange={(e) => setPassword(e.target.value)}
								// onChange={(e) => {
								// 	setPassword(e.target.value);
								// 	setPasswordError('');
								// 	setLoginError('');
								// }}
								onChange={handlePasswordChange}
								// onBlur={handlePasswordBlur}
							/>
							<PasswordToggleButton 
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
							>
								{showPassword ? <EyeOff size={20} color="#999999" /> : <Eye size={20} color="#999999" />}
							</PasswordToggleButton>
						</PasswordInputContainer>
						{passwordError && (
							<CustomFont $color="#FF4949" $font="0.8rem">
								{passwordError}
							</CustomFont>
						)}
					</CustomColumn>

					{loginError && (
						<CustomFont $color="#FF4949" $font="0.8rem">
						{loginError}
						</CustomFont>
					)}
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
							이메일 찾기
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
					<CustomButton 
						$backgroundColor="#F2F2F2" 
						$padding="0.5rem" 
						$width="auto" 
						$height="auto"
						onClick={() => router.push("/membersignup")}
					>
						<CustomFont $color="#999999" $font="0.8rem">
							회원가입
						</CustomFont>
					</CustomButton>
				</CustomRow>

				<CustomButton 
					$width="100%" 
					$alignItems="center" 
					$justifyContent="center" 
					$backgroundColor="#5296FF"
					onClick={handleLogin}
				>
					<CustomFont $color="white" $font="1.3em" $fontweight="bold">
						로그인
					</CustomFont>
				</CustomButton>
			</CustomColumn>
		</>
	);
}
