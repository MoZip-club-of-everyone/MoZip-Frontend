"use client";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
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
`;

export default function ShortAnswer({ question, details, isRequired }: { question: string; details: string; isRequired: boolean }) {
	return (
		<Wrapper>
			<Label>
				{question} {isRequired && "*"}
			</Label>
			<span>{details}</span>
			<Input type="text" required={isRequired} />
		</Wrapper>
	);
}