// 담당자: 나영
// Figma : 모집폼 관리 > [ 설정 ] 탭의 날짜 설정 컴포넌트입니다.

import CustomColumn from "@/components/CustomColumn";
import CustomFont from "@/components/CustomFont";
import CustomRow from "@/components/CustomRow";
import "../../components/SwitchButton.css";
import MozipDatePicker from "../../components/MozipDatePicker";

export default function MozipSettingDate() {

	return (
		<CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="center" $gap="1rem">
			<CustomRow $gap="0">
				<CustomFont $color="red" $font="1rem" $fontweight="bold">*</CustomFont>
				<CustomFont $color="black" $font="1rem" $fontweight="bold">모집날짜</CustomFont>
			</CustomRow>
			<MozipDatePicker />
		</CustomColumn>
	);
}
