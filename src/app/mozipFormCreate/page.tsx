// Figma 좌측 네비게이션 바에서 [ 모집폼 관리] 클릭하여 나타나는 화면입니다.
// 담당자(담당 브랜치): nayeong

// MozipTabs의 3개 메뉴는 MozipBlocks 폴더 내부의 중앙 컴포넌트 3개로 구현되어 있습니다.
// MozipBlocks의 컴포넌트 3개는 components의 세부 컴포넌트들로 구성됩니다.
// MozipLayout 폴더에서 SideBar와 Header를 정의하고, 레이아웃 컴포넌트를 정의했습니다.

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
