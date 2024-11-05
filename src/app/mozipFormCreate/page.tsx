// 모집 폼 생성 화면
// 담당자(담당 브랜치): nayeong

import CustomColumn from "@/components/CustomColumn";
import RequireInfo from "./MozipBlocks/RequireInfo";

export default function Home() {

	return (
		<CustomColumn $width="90%" $gap="2rem" $justifycontent="center">
			<RequireInfo />

			{/* 아래로 사용자가 생성하는 자유로운 문항들을 MozipBlock에 담아 반복문으로 찍어낼 계획입니다 */}
		</CustomColumn>
	);
}
