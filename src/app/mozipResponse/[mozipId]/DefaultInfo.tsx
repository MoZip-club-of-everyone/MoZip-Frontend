"use client";

import { useState } from "react";
import styled from "styled-components";

import CustomFont from "@/components/CustomFont";
import CustomBox from "@/components/CustomBox";
import CustomRow from "@/components/CustomRow";
import CustomColumn from "@/components/CustomColumn";
import CustomButton from "@/components/CustomButton";

interface MozipIdProps {
	mozipId: string;
}

export default function DefaultInfo({ mozipId }: MozipIdProps) {

	if (!mozipId) {
		return;
	}

	const [name, setName] = useState("");
	const [phone, setPhone] = useState({ first: "", second: "", third: "" });
	const [email, setEmail] = useState("");

	// 모든 필드가 입력되었는지 확인
	const isFormComplete =
		name.trim() !== "" &&
		phone.first.length === 3 &&
		phone.second.length === 4 &&
		phone.third.length === 4 &&
		email.trim() !== "";

	// 전화번호 입력 핸들러 (숫자만 입력 가능)
	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>, part: "first" | "second" | "third") => {
		const value = e.target.value.replace(/\D/g, "");

		// 각 필드별 길이 제한 적용
		if ((part === "first" && value.length <= 3) || (part === "second" && value.length <= 4) || (part === "third" && value.length <= 4)) {
			setPhone({ ...phone, [part]: value });
		}
	};

	// API 요청 핸들러
	const handleSubmit = async () => {
		if (!isFormComplete) return;
		const token = localStorage.getItem("accessToken");
		if (!token) {
			console.error("토큰이 없습니다.");
			return;
		}

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/api/mozip/${mozipId}`, // ✅ mozipId를 올바르게 전달
				{
					headers: {
						Authorization: `${token}`,
					},
				}
			);

			if (!response.ok) {
				throw new Error(`모집 기본정보 요청 실패: ${response.status}`);
			}

			const data = await response.json();
			// console.log("모집 데이터:", data);
			return data;
		} catch (error) {
			console.error("모집 데이터 가져오기 실패:", error);
			return null;
		}
	};

	return (
		<CustomColumn $width="100%" $alignitems="center" $justifycontent="center" $gap="1rem">
			<CustomBox
				$width="100%"
				$height="auto"
				$backgroundcolor="white"
				$padding="1rem"
				$overflowx="hidden"
				$overflowy="hidden"
				$alignitems="flex-start"
				$justifycontent="center"
				$flexdirection="column"
				$gap="0.5rem"
				$boxshadow="7px 7px 10px rgba(0.1, 0.1, 0.1, 0.3)"
			>
				<CustomRow $width="100%" $alignitems="center" $justifycontent="flex-start">
					<CustomFont $color="#666666" $fontweight="bold" $font="1rem">모집 응답 필수정보 수집</CustomFont>
					<CustomFont $color="red" $fontweight="bold">필수</CustomFont>
				</CustomRow>
				<CustomFont $font="0.6rem" $color="#D9D9D9">필수 정보 입력 후 약관에 동의해야 응답이 가능합니다.</CustomFont>

				<CustomFont $color="#666666">이름</CustomFont>
				<Input value={name} onChange={(e) => setName(e.target.value)} />

				<CustomFont $color="#666666">전화번호</CustomFont>
				<CustomRow $gap="0.5rem">
					<PhoneInput value={phone.first} onChange={(e) => handlePhoneChange(e, "first")} maxLength={3} />
					<PhoneInput value={phone.second} onChange={(e) => handlePhoneChange(e, "second")} maxLength={4} />
					<PhoneInput value={phone.third} onChange={(e) => handlePhoneChange(e, "third")} maxLength={4} />
				</CustomRow>

				<CustomFont $color="#666666">이메일</CustomFont>
				<Input value={email} onChange={(e) => setEmail(e.target.value)} />
			</CustomBox>

			<CustomRow $width="100%" $alignitems="center" $justifycontent="flex-end">
				<CustomButton
					$width="auto"
					$height="auto"
					$padding="1rem"
					$backgroundColor={isFormComplete ? "#5296FF" : "#D9D9D9"}
					onClick={handleSubmit}
					disabled={!isFormComplete}
				>
					<CustomFont $color="white" $font="1rem">다음</CustomFont>
				</CustomButton>
			</CustomRow>
		</CustomColumn>
	);
}

// 일반 입력 필드 스타일
const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-width: 50%;
`;

// 전화번호 입력 필드 스타일
const PhoneInput = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 3rem;
  text-align: center;
`;
