"use client";
import styled from "styled-components";
import CustomBox from "@/components/CustomBox";
import { useState } from "react";

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

// 자동저장하려면 onSave 추가하기 : onSave, onSave: (answer: string) => void;
export default function OneChoice({ question, details, isRequired, onSave }: { question: string; details: string; isRequired: boolean, onSave: (answer: string) => void; }) {

	const options = ["Option 1", "Option 2", "Option 3"];
	const [selectedOption, setSelectedOption] = useState<string>("");

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setSelectedOption(value);
		onSave(value);
	};

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
							<input
								type="radio"
								name={question}
								value={option}
								checked={selectedOption === option}
								onChange={handleChange}
								required={isRequired}
							/>
							{option}
						</label>
					</Option>
				))}
			</Wrapper>
		</CustomBox>
	);
}

{/* <label>
              <input 
                type="radio" 
                name={question} 
                value={option} 
                checked={selectedOption === option} 
                onChange={handleChange} 
                required={isRequired} 
              /> 
              {option}
            </label> */}