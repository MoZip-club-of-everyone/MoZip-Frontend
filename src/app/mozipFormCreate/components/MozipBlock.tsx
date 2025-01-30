"use client";

// 담당자: 나영
// Figma 디자인에서, 모집 생성 시 모든 문항이 들어갈 블록 컴포넌트입니다.

import React from "react";
import styled from "styled-components";
import CustomBox from "@/components/CustomBox";
import CustomDivider from "@/components/CustomDivider";
import CustomColumn from "@/components/CustomColumn";
import CustomRow from "@/components/CustomRow";
import CustomFont from "@/components/CustomFont";
import CustomButton from "@/components/CustomButton";
import MozipBlockDropdown from "./MozipDropdown";
import MozipBlockInput from "./MozipBlockInput";
import { IoIosArrowDown } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import { TbListNumbers } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaArrowsUpDown } from "react-icons/fa6";

const StyledIconContainer = styled.button`
  width: 2rem;
  height: 100%;
  background-color: #5296FF;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: none;
  cursor: pointer;
  transition: opacity 0.1s ease-in-out;
  &:hover {
    opacity: 0.7;
  }
`;

interface MozipBlockProps {
	id: number;
	type: string;
	question: string;
	onAdd: () => void;
	onRemove: () => void;
	onUpdate: (id: number, key: "type" | "question", value: string) => void;
}

export default function MozipBlock({
	id,
	type,
	question,
	onAdd,
	onRemove,
	onUpdate,
}: MozipBlockProps) {
	return (
		<CustomRow $width="100%" $alignitems="center" $justifycontent="center">
			<CustomBox $flexdirection="row" $backgroundcolor="white" $width="90%" $height="10rem" $alignitems="center" $justifycontent="flex-start" $border="1px solid #D9D9D9" $borderradius="1rem">
				<StyledIconContainer>
					<FaArrowsUpDown style={{ color: "white" }} />
				</StyledIconContainer>

				<CustomColumn $width="95%">
					<CustomRow $width="100%" $justifycontent="flex-end">
						<MozipBlockDropdown
							buttonText={
								<CustomRow $width="100%" $alignitems="center" $justifycontent="center">
									<CustomFont $color="#D8D8D8" $font="0.8rem">
										질문 유형 선택:
									</CustomFont>
									<CustomFont $color="black" $font="0.8rem">
										{type}
									</CustomFont>
									<IoIosArrowDown />
								</CustomRow>
							}
							menuItems={["단답형", "장문형", "객관식 질문", "체크박스"]}
							$width="auto"
							$height="3rem"
							$bordercolor="1px solid #D9D9D9"
							$borderradius="0.5rem"
							$highlightcolor="#8BB9FF"
							onSelect={(value) => onUpdate(id, "type", value)}
						/>
					</CustomRow>
					<MozipBlockInput
						$placeholder="질문을 입력하세요."
						$highlightcolor="#8BB9FF"
						$width="100%"
						$height="3rem"
						value={question}
						onChange={(e) => onUpdate(id, "question", e.target.value)}
					/>
				</CustomColumn>
			</CustomBox>

			<CustomColumn $width="10%" $alignitems="center" $justifycontent="center" $gap="1rem">
				<CustomButton $width="auto" $height="auto" $backgroundColor="black" $alignItems="center" $justifyContent="center" $borderRadius="1rem" $padding="1rem" onClick={onAdd}>
					<GoPlus style={{ color: "white" }} />
				</CustomButton>

				<CustomButton $width="auto" $height="auto" $backgroundColor="#FF7272" $alignItems="center" $justifyContent="center" $borderRadius="1rem" $padding="1rem" onClick={onRemove}>
					<FaRegTrashAlt style={{ color: "white" }} />
				</CustomButton>
			</CustomColumn>
		</CustomRow>
	);
}
