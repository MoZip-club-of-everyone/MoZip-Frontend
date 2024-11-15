// 담당자: 나영
// Figma : 모집폼 관리 > [ 설정 ] 탭 클릭 시 나타나는 컴포넌트입니다.

import CustomColumn from "@/components/CustomColumn";
import CustomFont from "@/components/CustomFont";
import CustomRow from "@/components/CustomRow";
import CustomButton from "@/components/CustomButton";
import "../../components/SwitchButton.css";

import MozipSettingDate from "./MozipSettingDate";
import MozipSettingMessage from "./MozipSettingMessage";
import MozipSettingDetail from "./MozipSettingDetail";

interface MozipSettingProps {
	onPublish: () => void;
	onPrev: () => void;
}

export default function MozipSetting({ onPublish, onPrev }: MozipSettingProps) {

	return (
		<CustomColumn $width="90%" $alignitems="center" $justifycontent="center">
			<MozipSettingDate />
			<MozipSettingMessage />
			<MozipSettingDetail />

			<CustomRow $width="100%" $alignitems="center" $justifycontent="flex-end">
				<CustomButton $width="5rem" $backgroundColor="white" $padding="1rem" $border="1px solid black" onClick={onPrev}>
					<CustomFont $color="black" $font="1rem">
						이전
					</CustomFont>
				</CustomButton>
				<CustomButton $width="7rem" $backgroundColor="#5296FF" $padding="1rem" onClick={onPublish}>
					<CustomFont $color="white" $font="1rem">
						모집 게시
					</CustomFont>
				</CustomButton>
			</CustomRow>
		</CustomColumn>
	);
}
