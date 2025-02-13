import React, { useState } from "react";
import CustomColumn from "@/components/CustomColumn";
import CustomFont from "@/components/CustomFont";
import CustomRow from "@/components/CustomRow";
import CustomButton from "@/components/CustomButton";
import MozipBlock from "../../components/MozipBlock";
import MozipQuestionDefaultInfo from "./MozipQuestionDefaultInfo";

interface MozipQuestionProps {
	onNext: () => void;
	onPrev: () => void;
}

export default function MozipQuestions({ onNext, onPrev }: MozipQuestionProps) {
	// 초기 로딩 시 기본 MozipBlock 한 개 포함
	const [blocks, setBlocks] = useState<Array<{ id: number; type: string; question: string }>>([
		{ id: Date.now(), type: "단답형", question: "" },
	]);

	// GoPlus 버튼 클릭 시 MozipBlock 추가
	const handleAddBlock = () => {
		setBlocks([...blocks, { id: Date.now(), type: "단답형", question: "" }]);
	};

	// MozipBlock 삭제
	const handleRemoveBlock = (id: number) => {
		setBlocks(blocks.filter((block) => block.id !== id));
	};

	// 질문 데이터 업데이트
	const handleUpdateBlock = (id: number, key: "type" | "question", value: string) => {
		setBlocks((prevBlocks) =>
			prevBlocks.map((block) =>
				block.id === id ? { ...block, [key]: value } : block
			)
		);
	};

	// 질문 유형 매핑
	const mapQuestionType = (type: string) => {
		switch (type) {
			case "단답형":
				return "SHORT_ANSWER";
			case "장문형":
				return "LONG_ANSWER";
			case "객관식 질문":
				return "ONE_CHOICE";
			case "체크박스":
				return "MULTIPLE_CHOICE";
			default:
				return "UNKNOWN";
		}
	};

	// localStorage에 데이터 저장
	const saveToLocalStorage = () => {
		const transformedBlocks = blocks.map((block) => ({
			...block,
			type: mapQuestionType(block.type),
		}));
		localStorage.setItem("mozipQuestions", JSON.stringify(transformedBlocks));
	};

	// 다음 단계로 이동
	const handleNext = () => {
		saveToLocalStorage();
		onNext();
	};

	return (
		<CustomColumn $width="100%" $alignitems="center" $justifycontent="center">
			<MozipQuestionDefaultInfo />

			<CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="center" $gap="0.5rem">
				<CustomFont $color="black" $font="1rem" $fontweight="bold">
					서류 질문
				</CustomFont>
				<CustomFont $color="black" $font="0.8rem">
					모든 지원자들이 답변을 작성할 질문을 생성하세요.
				</CustomFont>
			</CustomColumn>

			{/* MozipBlock 목록 */}
			{blocks.map((block) => (
				<MozipBlock
					key={block.id}
					id={block.id}
					type={block.type}
					question={block.question}
					onAdd={handleAddBlock}
					onRemove={() => handleRemoveBlock(block.id)}
					onUpdate={handleUpdateBlock}
				/>
			))}

			<CustomRow $width="100%" $alignitems="center" $justifycontent="flex-start">
				<CustomRow $width="90%" $alignitems="center" $justifycontent="flex-end">
					<CustomButton $width="5rem" $backgroundColor="white" $padding="1rem" $border="1px solid black" onClick={onPrev}>
						<CustomFont $color="black" $font="1rem">
							이전
						</CustomFont>
					</CustomButton>

					<CustomButton $width="5rem" $backgroundColor="#5296FF" $padding="1rem" onClick={handleNext}>
						<CustomFont $color="white" $font="1rem">
							다음
						</CustomFont>
					</CustomButton>
				</CustomRow>
			</CustomRow>
		</CustomColumn>
	);
}
