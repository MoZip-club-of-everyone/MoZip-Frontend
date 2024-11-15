// 담당자: 나영
// Figma : 모집폼 관리 > [ 설정 ] 탭의 '모집 전 안내문구', '모집 마감 후 문구'를 작성하는 컴포넌트입니다.

import React, { useState } from "react";
import CustomColumn from "@/components/CustomColumn";
import CustomFont from "@/components/CustomFont";
import CustomRow from "@/components/CustomRow";
import MozipBlockInput from "../../components/MozipBlockInput";
import "../../components/SwitchButton.css";

export default function MozipSettingMessage() {
	const [preRecruitText, setPreRecruitText] = useState("");
	const [postRecruitText, setPostRecruitText] = useState("");
	const maxLength = 50;

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
			<CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="center" $gap="1rem">
				<CustomFont $color="black" $font="1rem" $fontweight="bold">모집 전 안내 문구</CustomFont>
				<MozipBlockInput
					$placeholder="모집 전 안내 문구를 작성해주세요."
					$highlightcolor="#8BB9FF"
					$width="100%"
					$height="3rem"
					value={preRecruitText}
					onChange={handlePreRecruitTextChange}
				/>
				<CustomRow $width="100%" $justifycontent="flex-end">
					<CustomFont $color="gray" $font="0.8rem">최대 {preRecruitText.length} / {maxLength}</CustomFont>
				</CustomRow>
			</CustomColumn>

			<CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="center" $gap="1rem">
				<CustomFont $color="black" $font="1rem" $fontweight="bold">모집 마감 안내 문구</CustomFont>
				<MozipBlockInput
					$placeholder="모집이 마감된 후 안내 문구를 작성해주세요."
					$highlightcolor="#8BB9FF"
					$width="100%"
					$height="3rem"
					value={postRecruitText}
					onChange={handlePostRecruitTextChange}
				/>
				<CustomRow $width="100%" $justifycontent="flex-end">
					<CustomFont $color="gray" $font="0.8rem">최대 {postRecruitText.length} / {maxLength}</CustomFont>
				</CustomRow>
			</CustomColumn>
		</CustomColumn>
	);
}
