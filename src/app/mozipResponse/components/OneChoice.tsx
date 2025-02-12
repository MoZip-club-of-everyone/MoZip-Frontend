"use client";
import styled from "styled-components";
import CustomBox from "@/components/CustomBox";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Option = styled.div`
  margin-bottom: 0.5rem;
`;

export default function OneChoice({ question, details, isRequired }: { question: string; details: string; isRequired: boolean }) {
	const options = ["Option 1", "Option 2", "Option 3"];
	return (
		<CustomBox $width="100%" $height="auto" $backgroundcolor="white" $padding="1rem" $overflowx="hidden" $overflowy="hidden"
			$alignitems="flex-start" $justifycontent="center" $flexdirection="column" $gap="0.5rem" $boxshadow="7px 7px 10px rgba(0.1, 0.1, 0.1, 0.1)">
			<Wrapper>
				<Label>
					{question} {isRequired && "*"}
				</Label>
				<span>{details}</span>
				{options.map((option, index) => (
					<Option key={index}>
						<label>
							<input type="radio" name={question} required={isRequired} /> {option}
						</label>
					</Option>
				))}
			</Wrapper>
		</CustomBox>
	);
}