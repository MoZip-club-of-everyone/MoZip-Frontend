"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styled from "styled-components";
import ShortAnswer from "../components/ShortAnswer";
import LongAnswer from "../components/LongAnswer";
import OneChoice from "../components/OneChoice";
import MultipleChoice from "../components/MultipleChoice";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  max-width: 800px;
  margin: auto;
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

export default function MozipResponsePage() {
	const searchParams = useSearchParams();
	const router = useRouter();
	// const mozipId = searchParams.get("mozipId");
	const mozipId = '01JKR16CE177V2D3NDKWXGBRX2'
	const [questions, setQuestions] = useState<Question[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!mozipId) {
			setError("Mozip ID가 제공되지 않았습니다.");
			return;
		}

		const fetchQuestions = async () => {
			const token = localStorage.getItem("accessToken");
			console.log(token);
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

	return (
		<Wrapper>
			<Title>모집 응답 페이지 - {mozipId}</Title>
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
