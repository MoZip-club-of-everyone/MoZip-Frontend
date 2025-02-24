"use client";

import { useEffect, useState } from "react";
import ShortAnswer from "../components/ShortAnswer";
import LongAnswer from "../components/LongAnswer";
import OneChoice from "../components/OneChoice";
import MultipleChoice from "../components/MultipleChoice";
import CustomDivider from "@/components/CustomDivider";
import CustomRow from "@/components/CustomRow";
import CustomButton from "@/components/CustomButton";
import CustomFont from "@/components/CustomFont";

interface Question {
	type: "SHORT_ANSWER" | "LONG_ANSWER" | "ONE_CHOICE" | "MULTIPLE_CHOICE";
	question: string;
	question_id: string;
	details: string;
	isRequired: boolean;
}

interface AllQuestionsProps {
	mozipId: string;
}

export default function AllQuestions({ mozipId }: AllQuestionsProps) {
	const [questions, setQuestions] = useState<Question[]>([]); // 모든 질문들 관리 
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	// const applicantId = "01JKZGM6T42SH2SJVPFT6DSZPK"; // 하드코딩된 applicant id 임 !
	const applicantId = localStorage.getItem('applicantId'); // applicant id 꺼내오기 

	// 1. 모든 질문 받아오는 API 
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


	// 2. 답변 자동 저장 API 
	const handleSaveAnswer = async (questionId: string, answer: string | string[]) => {

		const token = localStorage.getItem("accessToken");
		if (!token) {
			setError("Authorization token is missing.");
			return;
		}

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/api/papers/answers`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `${token}`,
					},
					body: JSON.stringify({
						applicantId,
						questionId,
						answer,
					}),
				}
			);

			if (response.ok) {
				console.log(`'${questionId}' 질문의 답변 자동저장 성공!`);
				console.log('applicantId는', applicantId);
				console.log('questionId는', questionId);
				console.log('answer는', answer);
			} else {
				console.error("답변 저장 실패");
				// console.log('applicantId는', applicantId);
				// console.log('questionId는', questionId);
				// console.log('answer는', answer);
				// console.log('token은', token);
				console.log("request 형태:", JSON.stringify({
					applicantId,
					questionId,
					answer,
				}));

			}
		} catch (error) {
			console.error("오류 발생: ", error);
		}
	};

	// 3. 모든 답변 자동저장 후 최종 저장(?) API
	const handleSubmit = async () => {
		if (isSubmitting) return; // 중복 요청 방지
		setIsSubmitting(true);
		const token = localStorage.getItem("accessToken");
		if (!token) {
			setError("Authorization token is missing.");
			return;
		}

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/api/papers/answers/register/applicants/${applicantId}`,
				{
					method: "POST",
					headers: {
						Authorization: `${token}`,
						"Content-Type": "application/json",
					}
				}
			);

			if (!response.ok) {
				// throw new Error("제출에 실패했습니다.");
				alert("지원서 제출 실패 ㅠㅠ");
				console.log("오류:", response);
			}
			else {
				alert("지원서가 성공적으로 제출되었습니다.");
			}
		} catch (error) {
			console.error("제출 오류:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<>
			{questions.map((question, index) => {
				const onSave = (answer: string | string[]) => handleSaveAnswer(question.question_id, answer);

				switch (question.type) {
					case "SHORT_ANSWER":
						return <ShortAnswer key={index} question={question.question} details={question.details} isRequired={question.isRequired} onSave={onSave} />;
					case "LONG_ANSWER":
						return <LongAnswer key={index} question={question.question} details={question.details} isRequired={question.isRequired} onSave={onSave} />;
					case "ONE_CHOICE":
						return <OneChoice key={index} question={question.question} details={question.details} isRequired={question.isRequired} onSave={onSave} />;
					case "MULTIPLE_CHOICE":
						return <MultipleChoice key={index} question={question.question} details={question.details} isRequired={question.isRequired} onSave={onSave} />;
					default:
						return <div key={index}>질문의 종류를 알 수 없습니다.</div>;
				}
			})}

			<CustomDivider $width="100%" $height="1px" $backgroundcolor="#D9D9D9" />
			<CustomRow $width="100%" $alignitems="center" $justifycontent="flex-end">
				<CustomButton $width="auto" $height="auto" $padding="1rem" $backgroundColor="#5296FF" onClick={handleSubmit}>
					<CustomFont $color="white" $font="1rem">제출</CustomFont>
				</CustomButton>
			</CustomRow>
		</>
	);
}
