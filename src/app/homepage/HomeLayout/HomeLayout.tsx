// 담당자(담당 브랜치): nayeong
// Header, SideBar 위치를 정의하고, 중앙에 컴포넌트를 갈아낄 수 있도록 만든 레이아웃 컴포넌트 파일입니다.
// Header, SideBar 레이아웃이 필요하다면 이 컴포넌트를 import하여 사용하세요.

// 수정금지

import CustomRow from "@/components/CustomRow";
import CustomColumn from "@/components/CustomColumn";
import HomeHeader from "./HomeHeader";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
	return (
		<CustomColumn $width="100%" $gap="0">
			<HomeHeader />
			<CustomRow $width="100%" $gap="3rem">
				<CustomColumn
					$width="90%"
					$height="100vh"
					$gap="2rem"
					$justifycontent="flex-start"
					$alignitems="flex-start"
				>
					{children}
				</CustomColumn>
			</CustomRow>
		</CustomColumn>
	);
}
