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

	const [password, setPassword] = useState('');
	const [realname, setRealname] = useState('');
	const [email, setEmail] = useState('');
	const [phone1, setPhone1] = useState('');
	const [phone2, setPhone2] = useState('');
	const [phone3, setPhone3] = useState('');
	const [error, setError] = useState('');

	const handleSignup = async () => {
		// 입력 검증
		if (!password || !realname || !email || !phone1 || !phone2 || !phone3) {
			setError('모든 필드를 입력해주세요.');
			return;
		}

		// 전화번호 포맷팅
		const formattedPhone = `${phone1}-${phone2}-${phone3}`;

		const userData = {
			password: password,
			realname: realname,
			email: email,
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
				setError('이미 존재하는 아이디입니다.');
			} else {
				setError('회원가입 중 오류가 발생했습니다.');
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

					{error && (
						<CustomFont $color="red" $font="1rem">
							{error}
						</CustomFont>
					)}

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
								onChange={(e) => setEmail(e.target.value)}
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
								value={password}
								onChange={(e) => setPassword(e.target.value)}
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
								value={realname}
								onChange={(e) => setRealname(e.target.value)}
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
