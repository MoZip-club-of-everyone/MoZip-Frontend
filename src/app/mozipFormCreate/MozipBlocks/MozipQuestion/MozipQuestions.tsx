// 담당자: 나영
// Figma : 모집폼 관리 > [ 질문 작성 ] 탭 클릭 시 나타나는 컴포넌트입니다.
// 모집의 모든 문항을 작성하는 컴포넌트 파일입니다.

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
	const [blocks, setBlocks] = useState<Array<{ id: number; isDivider: boolean }>>([
		{ id: Date.now(), isDivider: false }
	]);

	// GoPlus 버튼 클릭 시 MozipBlock 추가
	const handleAddBlock = () => {
		setBlocks([...blocks, { id: Date.now(), isDivider: false }]);
	};

	// TbListNumbers 버튼 클릭 시 섹션 구분선 추가
	const handleAddDivider = () => {
		setBlocks([...blocks, { id: Date.now(), isDivider: true }]);
	};

	// MozipBlock 삭제 시 구분선이 함께 사라지지 않도록 수정함 : 2024.11.18
	const handleRemoveBlock = (id: number) => {
		const blockIndex = blocks.findIndex((block) => block.id === id);

		if (blockIndex === -1) return; // 블록이 존재하지 않으면 아무 작업도 하지 않음

		const newBlocks = [...blocks];

		// 삭제하려는 블록이 일반 블록이고 다음 블록이 구분선일 경우 구분선도 함께 삭제
		if (!newBlocks[blockIndex].isDivider && newBlocks[blockIndex + 1]?.isDivider) {
			newBlocks.splice(blockIndex, 2); // 현재 블록과 다음 구분선 제거
		} else {
			newBlocks.splice(blockIndex, 1); // 일반 삭제
		}

		setBlocks(newBlocks);
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
			{blocks.map((block) =>
				block.isDivider ? (
					<CustomFont key={block.id} $color="gray" $font="1rem">
						----섹션 구분선----
					</CustomFont>
				) : (
					<MozipBlock key={block.id} onAdd={handleAddBlock} onAddDivider={handleAddDivider} onRemove={() => handleRemoveBlock(block.id)} />
				)
			)}

			<CustomRow $width="100%" $alignitems="center" $justifycontent="flex-start">
				<CustomRow $width="90%" $alignitems="center" $justifycontent="flex-end">
					<CustomButton $width="5rem" $backgroundColor="white" $padding="1rem" $border="1px solid black" onClick={onPrev}>
						<CustomFont $color="black" $font="1rem">
							이전
						</CustomFont>
					</CustomButton>

					<CustomButton $width="5rem" $backgroundColor="#5296FF" $padding="1rem" onClick={onNext}>
						<CustomFont $color="white" $font="1rem">
							다음
						</CustomFont>
					</CustomButton>
				</CustomRow>
			</CustomRow>
		</CustomColumn>
	);
}
