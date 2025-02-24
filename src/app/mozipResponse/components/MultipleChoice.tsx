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

export default function MultipleChoice({ question, details, isRequired, onSave }: { question: string; details: string; isRequired: boolean, onSave: (answer: string) => void; }) {
	const options = ["Option 1", "Option 2", "Option 3", "Option 4"];
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		let updatedOptions = selectedOptions.includes(value)
			? selectedOptions.filter((option) => option !== value)
			: [...selectedOptions, value];
		setSelectedOptions(updatedOptions);
		// onSave(updatedOptions);
		onSave(updatedOptions.length === 1 ? updatedOptions[0] : updatedOptions.join(', '));
		// response 받을 떄 "1, 2, 3" 으로 오면, ,로 split해서 내가 가공해서 써야함 
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
								type="checkbox"
								name={question}
								value={option}
								checked={selectedOptions.includes(option)}
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
  type="checkbox" 
  name={question} 
  value={option} 
  checked={selectedOptions.includes(option)} 
  onChange={handleChange} 
  required={isRequired} 
/> 
{option}
</label> */}