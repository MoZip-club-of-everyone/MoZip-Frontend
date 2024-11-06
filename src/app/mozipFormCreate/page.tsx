// Figma 좌측 네비게이션 바에서 [ 모집폼 관리] 클릭하여 나타나는 화면입니다.
// 담당자(담당 브랜치): nayeong

import CustomColumn from "@/components/CustomColumn";
import MozipDescription from "./MozipBlocks/MozipDescription";
import MozipTabs from "./MozipTabs/MozipTabs";

export default function Home() {

	return (
		<CustomColumn $width="90%" $gap="2rem" $justifycontent="center" $alignitems="flex-start">
			<MozipTabs />
			<MozipDescription />
		</CustomColumn>
	);
}
