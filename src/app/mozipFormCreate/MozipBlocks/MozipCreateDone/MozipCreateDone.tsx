import CustomColumn from "@/components/CustomColumn";
import CustomFont from "@/components/CustomFont";
import CustomRow from "@/components/CustomRow";
import CustomButton from "@/components/CustomButton";
import CustomBox from "@/components/CustomBox";
import MozipCreateDoneMessage from "./MozipCreateDoneMessage";

import { RiShareBoxLine } from "react-icons/ri";
import { MdOutlineContentCopy } from "react-icons/md";

// 담당자: 나영
// Figma : 모집폼 관리 > [ 설정 ] 에서 '모집 게시' 버튼을 눌러 게시 완료 후 보이는 컴포넌트입니다.

interface MozipCreateDoneProps {
	onManage: () => void;
}

export default function MozipCreateDone({ onManage }: MozipCreateDoneProps) {

	return (
		<CustomColumn $width="90%" $alignitems="center" $justifycontent="center" $gap='2rem'>

			<MozipCreateDoneMessage />

			<CustomBox $width='100%' $height="auto" $border="1px solid #D8D8D8" $backgroundcolor="white"
				$padding='0.5rem' $alignitems="center" $justifycontent="center">
				<CustomRow $width="95%" $height="auto" $alignitems="center" $justifycontent="space-between">
					<CustomFont $color='black' $font='1rem'>www.mozip.com</CustomFont>

					<CustomRow $width='auto' $height="auto" $gap='1rem' $alignitems="center" $justifycontent="center">
						<CustomButton $width='auto' $height="auto" $flexDirection="row" $backgroundColor="#5296FF" $gap="0.5rem" $padding="0.5rem 1rem"
							onClick={onManage}>
							<RiShareBoxLine style={{ fontSize: '0.8rem', color: 'white' }} />
							<CustomFont $color='white' $font='0.8rem'>모집 폼 관리</CustomFont>
						</CustomButton>
						<CustomButton $width='auto' $height="auto" $flexDirection="row" $backgroundColor="#5296FF" $gap="0.5rem" $padding="0.5rem 1rem">
							<MdOutlineContentCopy style={{ fontSize: '0.8rem', color: 'white' }} />
							<CustomFont $color='white' $font='0.8rem'>링크 복사</CustomFont>
						</CustomButton>
					</CustomRow>
				</CustomRow>
			</CustomBox>
		</CustomColumn>
	);
}
