"use client";

import { useState } from "react";
import styled from "styled-components";

import CustomFont from "@/components/CustomFont";
import CustomBox from "@/components/CustomBox";
import CustomRow from "@/components/CustomRow";
import CustomColumn from "@/components/CustomColumn";
import CustomButton from "@/components/CustomButton";

interface DefaultInfoProps {
	mozipId: string;
	setSubmissionStatus: (status: "default" | "success" | "error") => void;
}

export default function DefaultInfo({ mozipId, setSubmissionStatus }: DefaultInfoProps) {
	if (!mozipId) {
		return;
	}

	const [name, setName] = useState("");
	const [phone, setPhone] = useState({ first: "", second: "", third: "" });
	const [email, setEmail] = useState("");

	// 모든 필드가 입력되었는지 확인하는 함수
	const isFormComplete =
		name.trim() !== "" &&
		phone.first.length === 3 &&
		phone.second.length === 4 &&
		phone.third.length === 4 &&
		email.trim() !== "";

	// 전화번호 입력 핸들러 (숫자만 입력 가능)
	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>, part: "first" | "second" | "third") => {
		const value = e.target.value.replace(/\D/g, ""); // 숫자만 허용

		// 각 필드별 길이 제한 적용
		if ((part === "first" && value.length <= 3) || (part === "second" && value.length <= 4) || (part === "third" && value.length <= 4)) {
			setPhone({ ...phone, [part]: value });
		}
	};

	// 지원자 생성 API 요청 보내기 (나중에 비회원의 경우 이 요청은 pass, 회읜의 경우 요청 보내도록 수정 필요)
	const handleSubmit = async () => {
		const token = localStorage.getItem("accessToken");
		if (!token) {
			setSubmissionStatus("error");
			return;
		}

		const requestBody = {
			realname: name,
			phone: `${phone.first}-${phone.second}-${phone.third}`,
			email: email,
		};

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/api/mozip/${mozipId}/applicants`,
				{
					method: "POST",
					headers: {
						Authorization: `${token}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify(requestBody),
				}
			);

			if (response.status === 200) {
				const data = await response.json();
				console.log("응답 데이터:", data);
				console.log("생성된 지원자의 applicantId는:", data.applicant_id);
				localStorage.setItem('applicantId', data.applicant_id); // applicantId를 저장하고, page에서 AllQuestion에게로 넘겨주어야 함
				setSubmissionStatus("success");
			} else {
				setSubmissionStatus("error");
			}
		} catch (error) {
			console.error("API 요청 실패:", error);
			setSubmissionStatus("error");
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

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-width: 50%;
`;

const PhoneInput = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 5rem;
  text-align: center;
`;
