import React, { useState, useEffect } from "react";
import CustomColumn from "@/components/CustomColumn";
import CustomFont from "@/components/CustomFont";
import CustomRow from "@/components/CustomRow";
import MozipBlockInput from "../../components/MozipBlockInput";
import "../../components/SwitchButton.css";

interface MozipSettingMessageProps {
	onChangeBeforeMessage: (value: string) => void;
	onChangeAfterMessage: (value: string) => void;
}

export default function MozipSettingMessage({
	onChangeBeforeMessage,
	onChangeAfterMessage,
}: MozipSettingMessageProps) {
	const [preRecruitText, setPreRecruitText] = useState("");
	const [postRecruitText, setPostRecruitText] = useState("");
	const maxLength = 50;

	// localStorage 및 상위 컴포넌트에 데이터 저장
	useEffect(() => {
		const messages = {
			preRecruitText,
			postRecruitText,
		};
		localStorage.setItem("mozipMessageSettings", JSON.stringify(messages));
		onChangeBeforeMessage(preRecruitText);
		onChangeAfterMessage(postRecruitText);
	}, [preRecruitText, postRecruitText]);

	const handlePreRecruitTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length <= maxLength) {
			setPreRecruitText(e.target.value);
		}
	};

	const handlePostRecruitTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length <= maxLength) {
			setPostRecruitText(e.target.value);
		}
	};

	return (
		<CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="center">
			{/* 모집 전 안내 문구 */}
			<CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="center" $gap="1rem">
				<CustomFont $color="black" $font="1rem" $fontweight="bold">
					모집 전 안내 문구
				</CustomFont>
				<MozipBlockInput
					$placeholder="모집 전 안내 문구를 작성해주세요."
					$highlightcolor="#8BB9FF"
					$width="100%"
					$height="3rem"
					value={preRecruitText}
					onChange={handlePreRecruitTextChange}
				/>
				<CustomRow $width="100%" $justifycontent="flex-end">
					<CustomFont $color="gray" $font="0.8rem">
						최대 {preRecruitText.length} / {maxLength}
					</CustomFont>
				</CustomRow>
			</CustomColumn>

			{/* 모집 마감 안내 문구 */}
			<CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="center" $gap="1rem">
				<CustomFont $color="black" $font="1rem" $fontweight="bold">
					모집 마감 안내 문구
				</CustomFont>
				<MozipBlockInput
					$placeholder="모집이 마감된 후 안내 문구를 작성해주세요."
					$highlightcolor="#8BB9FF"
					$width="100%"
					$height="3rem"
					value={postRecruitText}
					onChange={handlePostRecruitTextChange}
				/>
				<CustomRow $width="100%" $justifycontent="flex-end">
					<CustomFont $color="gray" $font="0.8rem">
						최대 {postRecruitText.length} / {maxLength}
					</CustomFont>
				</CustomRow>
			</CustomColumn>
		</CustomColumn>
	);
}
