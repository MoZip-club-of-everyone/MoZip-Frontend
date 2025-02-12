"use client";
import styled from "styled-components";
import CustomBox from "@/components/CustomBox";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 100%;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

export default function ShortAnswer({ question, details, isRequired }: { question: string; details: string; isRequired: boolean }) {
	return (
		<CustomBox $width="100%" $height="auto" $backgroundcolor="white" $padding="1rem" $overflowx="hidden" $overflowy="hidden"
			$alignitems="flex-start" $justifycontent="center" $flexdirection="column" $gap="0.5rem" $boxshadow="7px 7px 10px rgba(0.1, 0.1, 0.1, 0.1)">
			<Wrapper>
				<Label>
					{question} {isRequired && "*"}
				</Label>
				<span>{details}</span>
				<Input type="text" required={isRequired} />
			</Wrapper>
		</CustomBox>
	);
}