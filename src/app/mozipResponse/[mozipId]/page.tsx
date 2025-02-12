"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styled from "styled-components";
import ShortAnswer from "../components/ShortAnswer";
import LongAnswer from "../components/LongAnswer";
import OneChoice from "../components/OneChoice";
import MultipleChoice from "../components/MultipleChoice";
import Image from 'next/image';
import headerLogo from '@/assets/logo/headerLogo.svg';

import CustomFont from "@/components/CustomFont";
import CustomBox from "@/components/CustomBox";
import CustomRow from "@/components/CustomRow";
import CustomButton from "@/components/CustomButton";
import StyledImg from "@/components/StyledImg";
import CustomDivider from "@/components/CustomDivider";
import CustomColumn from "@/components/CustomColumn";

export default function MozipResponsePage() {
	const { mozipId } = useParams(); // URL에서 mozipId 가져오기
	const [questions, setQuestions] = useState<Question[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [moxipDetail, setMoxipDetail] = useState<MoxipDetail | null>(null);
	const [moxipError, setMoxipError] = useState<string | null>(null);

	// 1. 제목, 설명, 기간 등 정보를 가져오는 API 호출
	const fetchMoxipDetail = async (mozipId: string) => {
		const token = localStorage.getItem("accessToken");
		if (!token) {
			setMoxipError("Authorization token is missing.");
			return;
		}

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/api/mozip/${mozipId}`,
				{
					headers: {
						Authorization: `${token}`,
					},
				}
			);

			if (!response.ok) {
				throw new Error("Failed to fetch Moxip details.");
			}

			const data = await response.json();
			console.log('응답값은:', data);
			console.log(data.title);
			console.log(data.description);
			setMoxipDetail(data);
		} catch (err) {
			setMoxipError((err as Error).message);
		}
	};

	// 페이지 로드 시 자동 호출
	useEffect(() => {
		if (mozipId) {
			const id = Array.isArray(mozipId) ? mozipId[0] : mozipId;
			fetchMoxipDetail(id);
		}
	}, [mozipId]);

	// 2. 모든 서류 질문을 가져오기 위한 API 호출 
	useEffect(() => {
		if (!mozipId) {
			setError("Mozip ID가 제공되지 않았습니다.");
			return;
		}

		const fetchQuestions = async () => {
			const token = localStorage.getItem("accessToken");
			if (!token) {
				setError("Authorization token is missing.");
				return;
			}

			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_SERVER_URL}/api/papers/questions?mozip_id=${mozipId}`,
					{
						headers: {
							Authorization: `${token}`,
						},
					}
				);

				if (!response.ok) {
					throw new Error("Failed to fetch questions.");
				}

				const data = await response.json();
				setQuestions(data.list || []);
			} catch (err) {
				setError((err as Error).message);
			}
		};

		fetchQuestions();
	}, [mozipId]);

	if (error) {
		return <div>Error: {error}</div>;
	}

	if (!moxipDetail) {
		return;
	}

	return (
		<Wrapper>
			<CustomRow $width="100%" $alignitems="center" $justifycontent="space-between">
				{/* <StyledImg src={logo} $width="4rem" /> */}
				<Image src={headerLogo} alt='logo' />
				<CustomButton $width='auto' $height='auto' $padding='0' $backgroundColor="transparent">
					<CustomFont $color='black'>로그인</CustomFont>
				</CustomButton>
			</CustomRow>

			<CustomDivider $width='100%' $height='1px' $backgroundcolor="#D9D9D9" />
			<CustomRow $width='100%' $justifycontent="flex-start" $alignitems="center">
				<CustomFont $color='black' $font='1.5rem' $fontweight="bold">{moxipDetail.title}</CustomFont>
			</CustomRow>

			<CustomColumn $width='100%' $gap='0.5rem'>
				<CustomDivider $width='100%' $height='1px' $backgroundcolor="#D9D9D9" />
				<CustomRow $width='100%' $justifycontent="flex-end" $alignitems="center">
					<CustomFont $color='black' $font="1rem">로그인 시 자동 저장됩니다.</CustomFont>
				</CustomRow>
				<CustomColumn $height="1rem" />
			</CustomColumn>

			<CustomBox $width="100%" $backgroundcolor="white" $padding="1rem" $overflowx="hidden" $overflowy="hidden" $border="1px solid #D9D9D9"
				$alignitems="flex-start" $justifycontent="center" $flexdirection="column" $gap="0.5rem" $boxshadow="7px 7px 10px rgba(0.1, 0.1, 0.1, 0.3)">
				<CustomFont $color='#666666' $fontweight="bold" $font="1rem">{moxipDetail.description}</CustomFont>
			</CustomBox>
			<CustomDivider $width="100%" $height="1px" $backgroundcolor="#D9D9D9" />

			<CustomBox $width="100%" $height="auto" $backgroundcolor="white" $padding="1rem" $overflowx="hidden" $overflowy="hidden"
				$alignitems="flex-start" $justifycontent="center" $flexdirection="column" $gap="0.5rem" $boxshadow="7px 7px 10px rgba(0.1, 0.1, 0.1, 0.3)">
				<CustomRow $width="100%" $alignitems="center" $justifycontent="flex-start">
					<CustomFont $color='#666666' $fontweight="bold" $font="1rem">모집 응답 필수정보 수집</CustomFont>
					<CustomFont $color='red' $fontweight="bold">필수</CustomFont>
				</CustomRow>
				<CustomFont $font="0.6rem" $color="#D9D9D9">필수 정보 입력 후 약관에 동의해야 응답이 가능합니다.</CustomFont>

				<CustomFont $color="#666666">이름</CustomFont>
				<Input />

				{/* 나중에 제대로 수정하기 */}
				<CustomFont $color="#666666">전화번호</CustomFont>
				<Input />

				{/* 나중에 제대로 수정하고, 형식검사 추가하기 */}
				<CustomFont $color="#666666">이메일</CustomFont>
				<Input />
			</CustomBox>
			<CustomDivider $width="100%" $height="1px" $backgroundcolor="#D9D9D9" />

			{questions.map((question, index) => {
				switch (question.type) {
					case "SHORT_ANSWER":
						return (

							<ShortAnswer
								key={index}
								question={question.question}
								details={question.details}
								isRequired={question.isRequired}
							/>

						);
					case "LONG_ANSWER":
						return (

							<LongAnswer
								key={index}
								question={question.question}
								details={question.details}
								isRequired={question.isRequired}
							/>

						);
					case "ONE_CHOICE":
						return (

							<OneChoice
								key={index}
								question={question.question}
								details={question.details}
								isRequired={question.isRequired}
							/>

						);
					case "MULTIPLE_CHOICE":
						return (

							<MultipleChoice
								key={index}
								question={question.question}
								details={question.details}
								isRequired={question.isRequired}
							/>

						);
					default:
						return <div key={index}>질문의 종류를 알 수 없네요.</div>;
				}
			})}
			<CustomRow $width="100%" $alignitems="center" $justifycontent="flex-end">
				<CustomButton $width='auto' $height='auto' $padding="1rem" $backgroundColor="#5296FF">
					<CustomFont $color="white" $font="1rem">제출</CustomFont>
				</CustomButton>
			</CustomRow>
		</Wrapper>
	);
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  width: 80%;
  min-height: 100vh;
  margin: auto;
  justify-content: flex-start;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-width: 50%;
`;

type Question = {
	type: "SHORT_ANSWER" | "LONG_ANSWER" | "ONE_CHOICE" | "MULTIPLE_CHOICE";
	question: string;
	details: string;
	isRequired: boolean;
};

type MoxipDetail = {
	id: string;
	title: string;
	description: string;
	startDate: string;
	endDate: string;
	descriptionBeforeMozip: string;
	descriptionAfterMozip: string;
	loginRequired: boolean;
	editAvailable: boolean;
	images?: { id: string; url: string; description?: string }[];
};
