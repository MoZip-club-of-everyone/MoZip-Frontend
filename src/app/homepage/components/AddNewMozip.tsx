"use client";

import CustomFont from "@/components/CustomFont";
import CustomRow from "@/components/CustomRow";
import CustomButton from "@/components/CustomButton";
import { FaPlus } from "react-icons/fa";

// 담당자: 현아
// Figma : 홈 > [ 모집 ] 탭 클릭 시 나타나는 컴포넌트입니다.
// 모집에 대한 설명을 작성하는 컴포넌트 파일입니다.

export default function AddNewMozip() {

	return (

		<CustomRow $width="100%" $alignitems="center" $justifycontent="flex-end">
			<CustomButton $width='8rem' $flexDirection="row" $backgroundColor="#5296FF" $padding="0.2rem 0.5rem" $alignItems="center" $justifyContent="center">
				<FaPlus style={{ color: 'white', fontSize: '1rem' }} />
				<CustomFont>새로운 모집</CustomFont>
			</CustomButton>
		</CustomRow>

	);
}
