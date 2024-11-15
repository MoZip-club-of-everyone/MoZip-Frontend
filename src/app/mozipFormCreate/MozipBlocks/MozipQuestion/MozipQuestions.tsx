// 담당자: 나영
// Figma : 모집폼 관리 > [ 질문 작성 ] 탭 클릭 시 나타나는 컴포넌트입니다.
// 모집의 모든 문항을 작성하는 컴포넌트 파일입니다.

import CustomColumn from "@/components/CustomColumn";
import CustomFont from "@/components/CustomFont";
import CustomRow from "@/components/CustomRow";
import CustomButton from "@/components/CustomButton";

import MozipBlock from "../../components/MozipBlock";
import MozipQuestionDefaultInfo from "./MozipQuestionDefaultInfo";

interface MozipQuestionProps {
	onNext: () => void;
	onPrev: () => void;
}

export default function MozipQuestions({ onNext, onPrev }: MozipQuestionProps) {

	return (

		<CustomColumn $width="100%" $alignitems="center" $justifycontent="center">

			<MozipQuestionDefaultInfo />

			<CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="center" $gap='0.5rem'>
				<CustomFont $color="black" $font="1rem" $fontweight="bold">서류 질문</CustomFont>
				<CustomFont $color="black" $font="0.8rem">모든 지원자들이 답변을 작성할 질문을 생성하세요.</CustomFont>
			</CustomColumn>

			<MozipBlock />

			<CustomRow $width="100%" $alignitems="center" $justifycontent="flex-start">
				<CustomRow $width="90%" $alignitems="center" $justifycontent="flex-end">
					<CustomButton $width="5rem" $backgroundColor="white" $padding="1rem" $border="1px solid black" onClick={onPrev}>
						<CustomFont $color="black" $font="1rem">
							이전
						</CustomFont>
					</CustomButton>

					<CustomButton $width="5rem" $backgroundColor="#5296FF" $padding="1rem" onClick={onNext}>
						<CustomFont $color="white" $font="1rem">
							다음
						</CustomFont>
					</CustomButton>
				</CustomRow>
			</CustomRow>
		</CustomColumn>

	);
}
