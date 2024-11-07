import CustomColumn from "@/components/CustomColumn";
import CustomFont from "@/components/CustomFont";
import CustomRow from "@/components/CustomRow";
import CustomButton from "@/components/CustomButton";
import CustomDivider from "@/components/CustomDivider";

import MozipBlockInput from "../components/MozipBlockInput";
import MozipBlockTextarea from "../components/MozipBlockTextarea";

// 담당자: 나영
// Figma : 모집폼 관리 > [ 질문 작성 ] 탭 클릭 시 나타나는 컴포넌트입니다.
// 모집의 모든 문항을 작성하는 컴포넌트 파일입니다.

export default function MozipQuestions() {

	return (

		<CustomColumn $width="100%" $alignitems="center" $justifycontent="center">
			<CustomFont $color="black" $font="1rem">여기는 질문 작성 탭</CustomFont>
		</CustomColumn>

	);
}
