// Figma 좌측 네비게이션 바에서 [ 모집폼 관리] 클릭하여 나타나는 화면입니다.
// 담당자(담당 브랜치): nayeong

import CustomRow from "@/components/CustomRow";
import CustomColumn from "@/components/CustomColumn";
import MozipDescription from "./MozipBlocks/MozipDescription";
import MozipTabs from "./MozipTabs/MozipTabs";
import SideBar from "./MozipLayout/sidebar";
import Header from "./MozipLayout/header";

export default function Home() {

	return (
		<CustomColumn $width="100%" $gap="0">
			<Header />
			<CustomRow $width="100%" $gap="3rem">
				<SideBar />
				<CustomColumn $width="90%" $height="100vh" $gap="2rem" $justifycontent="flex-start" $alignitems="flex-start">
					<MozipTabs />
					<MozipDescription />
				</CustomColumn>
			</CustomRow>
		</CustomColumn>
	);
}
