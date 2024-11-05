import CustomColumn from "@/components/CustomColumn";
import CustomFont from "@/components/CustomFont";
import CustomRow from "@/components/CustomRow";

import MozipBlock from "../components/MozipBlock";
import MozipBlockInput from "../components/MozipBlockInput";
import MozipBlockTextarea from "../components/MozipBlockTextarea";

// 담당자: 나영
// 필수정보 입력을 위해, 상단에 반드시 1개 위치해야 하는 MozipBlock 컴포넌트입니다.

export default function RequireInfo() {

	return (
		<MozipBlock>
			<CustomColumn $width="100%" $alignitems="center" $justifycontent="center">
				<CustomRow $width="100%">
					<CustomRow $width="50%" $justifycontent="flex-start">
						<CustomFont $color='black' $font='1.2rem'>모집 제목을 작성해주세요.</CustomFont>
					</CustomRow>
					<MozipBlockInput
						$placeholder="제목을 입력하세요."
						$highlightcolor="#8BB9FF"
						$width="50%"
						$height="40px"
					/>
				</CustomRow>

				<CustomRow $width="100%">
					<CustomRow $width="50%" $justifycontent="flex-start">
						<CustomFont $color='black' $font='1.2rem'>모집 안내 글을 작성해주세요.</CustomFont>
					</CustomRow>
					<MozipBlockTextarea
						$placeholder="제목을 입력하세요."
						$highlightcolor="#8BB9FF"
						$width="50%"
						maxLength={1000}
					/>
				</CustomRow>
			</CustomColumn>
		</MozipBlock>
	);
}
