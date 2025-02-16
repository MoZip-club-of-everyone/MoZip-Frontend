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
import { useState } from "react";
import putPwChange from "@/api/put/putPwChange";
import styled from "styled-components"
import { Eye, EyeOff } from "lucide-react"; // 아이콘 추가

interface FindPWProps {
	setCurrentView: (view: "login" | "certificate" | "findID" | "findPW") => void;
}

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

export default function FindPW({ setCurrentView }: FindPWProps) {
	const userID = localStorage.getItem("userId")
    const [password, setPassword] = useState("")
    const [checkPw, setCheckPw] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmError, setConfirmError] = useState("")
    const [showPassword, setShowPassword] = useState(false)

	// 비밀번호 유효성 검사 함수
    const validatePassword = (value: string) => {
        if (!value) {
            return '비밀번호를 입력해주세요.';
        }
        if (value.length < 8) {
            return '비밀번호는 8자 이상이어야 합니다.';
        }
        // 영문, 숫자, 특수문자 중 2가지 이상 조합 체크
        let containsLetter = /[A-Za-z]/.test(value);
        let containsNumber = /\d/.test(value);
        let containsSpecial = /[@$!%*#?&]/.test(value);
        
        let combinationCount = 0;
        if (containsLetter) combinationCount++;
        if (containsNumber) combinationCount++;
        if (containsSpecial) combinationCount++;
        
        if (combinationCount < 2) {
            return '비밀번호는 영문, 숫자, 특수문자 중 2가지 이상을 포함해야 합니다.';
        }
        return '';
    };

    // 비밀번호 입력 핸들러
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        setPasswordError(validatePassword(value));
        if (checkPw) {
            setConfirmError(value === checkPw ? '' : '비밀번호가 일치하지 않습니다.');
        }
    };

    // 비밀번호 확인 입력 핸들러
    const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCheckPw(value);
        setConfirmError(value === password ? '' : '비밀번호가 일치하지 않습니다.');
    };

	const handleChangePW =  async () => {
		if (!userID) {
			alert("사용자 ID가 존재하지 않습니다.");
			return;
		}
	
		if (passwordError || confirmError) {
			alert("비밀번호를 확인해주세요.");
			return;
		}

        const Request = {
            userId: userID,
            password: password
        };
		
		console.log("리퀘스트 바디: ", Request);
		try{
			const response = await putPwChange(Request);
			console.log('비밀번호 변경 성공: ', response);
			alert("비밀번호 변경이 완료되었습니다. 다시 로그인해주세요.");
			setCurrentView("login");
		} catch (error: any) {
			alert("비밀번호 변경에 실패하였습니다.")
		}

	}

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
						<PasswordInputContainer>
							<MozipBlockInput
								$placeholder="비밀번호 입력"
								$highlightcolor="#8BB9FF"
								$width="100%"
								$height="3rem"
								type={showPassword ? "text" : "password"}
								value={password}
								onChange={handlePasswordChange}
							/>
							<PasswordToggleButton 
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
								>
									{showPassword ? <Eye size={20} color="#999999" /> : <EyeOff size={20} color="#999999" />}
							</PasswordToggleButton>
						</PasswordInputContainer>
						{passwordError && (
                            <CustomFont $color="red" $font="0.8rem">{passwordError}</CustomFont>
                        )}
					</CustomColumn>

					<CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="center" $gap="0.5rem">
						<CustomRow $width="100%" $alignitems="center" $justifycontent="flex-start" $gap="0.5rem">
							<CustomFont $color="#363636" $font="1rem">비밀번호 확인</CustomFont>
							<CustomFont $color="red" $font="1rem">*</CustomFont>
						</CustomRow>
						
						<PasswordInputContainer>
							<MozipBlockInput
								$placeholder="비밀번호 확인"
								$highlightcolor="#8BB9FF"
								$width="100%"
								$height="3rem"
								type={showPassword ? "text" : "password"}
								value={checkPw}
								onChange={handleConfirmChange}
							/>
							<PasswordToggleButton 
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
							>
								{showPassword ? <Eye size={20} color="#999999" /> : <EyeOff size={20} color="#999999" />}
						</PasswordToggleButton>
						</PasswordInputContainer>
						{confirmError && (
                            <CustomFont $color="red" $font="0.8rem">{confirmError}</CustomFont>
                        )}
					</CustomColumn>
				</CustomColumn>

				<CustomButton
					$width="100%"
					$alignItems="center"
					$justifyContent="center"
					$backgroundColor="#5296FF"
					onClick={handleChangePW}
				>
					<CustomFont $color="white" $font="1.3em" $fontweight="bold">확인</CustomFont>
				</CustomButton>
			</CustomColumn>
		</>
	);
}
