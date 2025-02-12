"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styled from "styled-components";
import ShortAnswer from "../components/ShortAnswer";
import LongAnswer from "../components/LongAnswer";
import OneChoice from "../components/OneChoice";
import MultipleChoice from "../components/MultipleChoice";

import CustomFont from "@/components/CustomFont";
import CustomRow from "@/components/CustomRow";
import CustomButton from "@/components/CustomButton";

interface MozipIdProps {
	mozipId: string;
}

export default function AllQuestion({ mozipId }: MozipIdProps) {
	// const { mozipId } = useParams(); // URL에서 mozipId 가져오기
	const [questions, setQuestions] = useState<Question[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [moxipDetail, setMoxipDetail] = useState<MoxipDetail | null>(null);
	const [moxipError, setMoxipError] = useState<string | null>(null);


	// 모든 서류 질문을 가져오기 위한 API 호출 
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
