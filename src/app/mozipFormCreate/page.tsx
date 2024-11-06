// Figma 좌측 네비게이션 바에서 [ 모집폼 관리] 클릭하여 나타나는 화면입니다.
// 담당자(담당 브랜치): nayeong

import MozipDescription from "./MozipBlocks/MozipDescription";
import MozipTabs from "./MozipTabs/MozipTabs";
import MozipLayout from "./MozipLayout/MozipLayout";

export default function Home() {

	return (
		<MozipLayout>
			<MozipTabs />
			<MozipDescription />
		</MozipLayout>
	);
}
