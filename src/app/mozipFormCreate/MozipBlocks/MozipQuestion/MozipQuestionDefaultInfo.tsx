// 담당자: 나영
// Figma : 모집폼 관리 > [ 질문 작성 ] 탭의 기본정보 입력 컴포넌트입니다.

import CustomColumn from "@/components/CustomColumn";
import CustomFont from "@/components/CustomFont";
import CustomRow from "@/components/CustomRow";

import MozipBlockDropdown from "../../components/MozipDropdown";
import { IoIosArrowDown } from "react-icons/io";

export default function MozipQuestionDefaultInfo() {

	return (
		<CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="center" $gap='0.5rem'>
			<CustomFont $color="black" $font="1rem" $fontweight="bold">지원자 정보</CustomFont>
			<CustomFont $color="black" $font="0.8rem">기본적으로 수집하는 지원자 정보입니다. 자유롭게 항목을 추가/삭제하세요.</CustomFont>

			<MozipBlockDropdown
				buttonText={
					<CustomRow $width="100%" $alignitems="center" $justifycontent="center">
						<CustomFont $color='#D8D8D8' $font='1rem'>기본 수집 정보:</CustomFont>
						<CustomFont $color='#2D538C' $font='1rem'>이름, 이메일, 전화번호</CustomFont>
						<IoIosArrowDown />
					</CustomRow>
				}
				menuItems={["이름", "이메일", "전화번호", "주소"]}
				$width="auto"
				$height="3rem"
				$bordercolor="1px solid #D9D9D9"
				$borderradius="0.5rem"
				$highlightcolor="#8BB9FF"
			/>
		</CustomColumn>
	);
}
