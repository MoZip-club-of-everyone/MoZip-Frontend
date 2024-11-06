import CustomFont from "@/components/CustomFont";
import CustomRow from "@/components/CustomRow";
import StyledImg from "@/components/StyledImg";

// 담당자: 나영
// Figma : 모집폼 관리 > 상단 세개의 탭을 관리하는 파일입니다.
// /mozipFormCreate의 page.tsx에서 현재 표시하고 있는 컴포넌트의 옆에 파란별을 띄워 표시합니다.

export default function MozipTabs() {

	return (

		<CustomRow $width="100%" $alignitems="center" $justifycontent="flex-start" $gap="1rem">

			<CustomRow $width="auto" $alignitems="center" $justifycontent="center" $gap="0.5rem">
				<CustomFont $color='black' $font="1.2rem" $fontweight="bold">설명 작성</CustomFont>
				<StyledImg src={'/icon_TabStar.png'} $width='1rem' $height="1rem" />
			</CustomRow>

			<CustomFont $color='black' $font="1.3rem">{'>'}</CustomFont>

			<CustomRow $width="auto" $alignitems="center" $justifycontent="center" $gap="0.5rem">
				<CustomFont $color='black' $font="1.2rem" $fontweight="bold">질문 작성</CustomFont>
			</CustomRow>

			<CustomFont $color='black' $font="1.3rem">{'>'}</CustomFont>

			<CustomRow $width="auto" $alignitems="center" $justifycontent="center" $gap="0.5rem">
				<CustomFont $color='black' $font="1.2rem" $fontweight="bold">설정</CustomFont>
			</CustomRow>

		</CustomRow>
	);
}
