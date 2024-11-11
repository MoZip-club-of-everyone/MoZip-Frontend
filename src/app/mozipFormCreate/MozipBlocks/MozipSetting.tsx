import React, { useState } from "react";
import CustomColumn from "@/components/CustomColumn";
import CustomFont from "@/components/CustomFont";
import CustomRow from "@/components/CustomRow";
import CustomButton from "@/components/CustomButton";
import MozipBlockInput from "../components/MozipBlockInput";
import MozipDatePicker from "../components/MozipDatePicker";
import "../components/SwitchButton.css";

// 담당자: 나영
// Figma : 모집폼 관리 > [ 설정 ] 탭 클릭 시 나타나는 컴포넌트입니다.

export default function MozipSetting() {
	const [preRecruitText, setPreRecruitText] = useState("");
	const [postRecruitText, setPostRecruitText] = useState("");
	const [isLoginRequired, setIsLoginRequired] = useState(false);
	const [isEditAllowed, setIsEditAllowed] = useState(false);
	const [isInterviewIncluded, setIsInterviewIncluded] = useState(false);
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
		<CustomColumn $width="90%" $alignitems="center" $justifycontent="center">
			<CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="center" $gap="1rem">
				<CustomRow $gap="0">
					<CustomFont $color="red" $font="1rem" $fontweight="bold">*</CustomFont>
					<CustomFont $color="black" $font="1rem" $fontweight="bold">모집날짜</CustomFont>
				</CustomRow>
				<MozipDatePicker />
			</CustomColumn>

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

			<CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="center" $gap="1rem">
				<CustomRow $width="100%" $alignitems="center" $justifycontent="space-between">
					<CustomFont $color="black" $font='1rem' $fontweight="bold">지원자 로그인 필수 여부</CustomFont>
					<CustomRow>
						<label className="switch">
							<input type="checkbox" checked={isLoginRequired} onChange={() => setIsLoginRequired(!isLoginRequired)} />
							<span className="slider"></span>
						</label>
						<CustomFont $color="black" $font="0.8rem">
							{isLoginRequired ? "지원 시 로그인 필수" : "지원 시 로그인 선택"}
						</CustomFont>
					</CustomRow>
				</CustomRow>

				<CustomRow $width="100%" $alignitems="center" $justifycontent="space-between">
					<CustomFont $color="black" $font='1rem' $fontweight="bold">응답 수정 허용 여부</CustomFont>
					<CustomRow>
						<label className="switch">
							<input type="checkbox" checked={isEditAllowed} onChange={() => setIsEditAllowed(!isEditAllowed)} />
							<span className="slider"></span>
						</label>
						<CustomFont $color="black" $font="0.8rem">
							{isEditAllowed ? "응답 수정 가능" : "응답 수정 불가능"}
						</CustomFont>
					</CustomRow>
				</CustomRow>

				<CustomRow $width="100%" $alignitems="center" $justifycontent="space-between">
					<CustomFont $color="black" $font='1rem' $fontweight="bold">면접 평가 여부</CustomFont>
					<CustomRow>
						<input type="checkbox" checked={isInterviewIncluded} onChange={() => setIsInterviewIncluded(!isInterviewIncluded)} />
						<CustomFont $color="black" $font="0.8rem">
							면접 평가 포함
						</CustomFont>
					</CustomRow>
				</CustomRow>
			</CustomColumn>

			<CustomRow $width="100%" $alignitems="center" $justifycontent="flex-end">
				<CustomButton $width="5rem" $backgroundColor="white" $padding="1rem" $border="1px solid black">
					<CustomFont $color="black" $font="1rem">
						이전
					</CustomFont>
				</CustomButton>
				<CustomButton $width="7rem" $backgroundColor="#5296FF" $padding="1rem">
					<CustomFont $color="white" $font="1rem">
						모집 게시
					</CustomFont>
				</CustomButton>
			</CustomRow>
		</CustomColumn>
	);
}
