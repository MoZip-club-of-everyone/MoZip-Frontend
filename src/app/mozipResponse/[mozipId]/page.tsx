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
			<Title>{moxipDetail.title}</Title>
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
						return <div key={index}>Unknown question type</div>;
				}
			})}
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

const Title = styled.h1`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1rem;
`;

type Question = {
	type: "SHORT_ANSWER" | "LONG_ANSWER" | "ONE_CHOICE" | "MULTIPLE_CHOICE";
	question: string;
	details: string;
	isRequired: boolean;
};
