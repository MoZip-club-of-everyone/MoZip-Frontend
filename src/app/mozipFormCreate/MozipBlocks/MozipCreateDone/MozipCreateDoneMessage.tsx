// 담당자: 나영
// Figma : 모집폼 관리 > [ 설정 ] 에서 '모집 게시' 버튼을 눌러 게시 완료 후 보이는 컴포넌트의 안내 메시지 컴포넌트입니다.

import CustomFont from "@/components/CustomFont";
import CustomRow from "@/components/CustomRow";
import { TbArrowBigDownLinesFilled } from "react-icons/tb";

export default function MozipCreateDoneMessage() {

	return (
		<>
			<CustomFont $color='black' $font="1.5rem" $fontweight="bold">
				모집이 게시되었습니다!
			</CustomFont>
			<CustomFont $color='black' $font="1.5rem" $fontweight="bold">
				아래 링크를 공유해 모집을 시작해보세요!
			</CustomFont>
			<CustomRow $gap='1rem'>
				<TbArrowBigDownLinesFilled style={{ fontSize: '2rem' }} />
				<TbArrowBigDownLinesFilled style={{ fontSize: '2rem' }} />
			</CustomRow>
		</>
	);
}
