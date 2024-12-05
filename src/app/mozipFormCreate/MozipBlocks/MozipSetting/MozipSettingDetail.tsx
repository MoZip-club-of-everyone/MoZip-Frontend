// 담당자: 나영
// Figma : 모집폼 관리 > [ 설정 ] 탭 하단의 3줄 상세설정 컴포넌트입니다.

import React, { useState } from "react";
import CustomColumn from "@/components/CustomColumn";
import CustomFont from "@/components/CustomFont";
import CustomRow from "@/components/CustomRow";
import "../../components/SwitchButton.css";

export default function MozipSettingDetail() {
	const [isLoginRequired, setIsLoginRequired] = useState(false);
	const [isEditAllowed, setIsEditAllowed] = useState(false);
	const [isInterviewIncluded, setIsInterviewIncluded] = useState(false);

	return (
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
	);
}
