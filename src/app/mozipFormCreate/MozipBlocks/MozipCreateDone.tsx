import React, { useState } from "react";
import CustomColumn from "@/components/CustomColumn";
import CustomFont from "@/components/CustomFont";
import CustomRow from "@/components/CustomRow";
import CustomButton from "@/components/CustomButton";
import CustomBox from "@/components/CustomBox";
import { TbArrowBigDownLinesFilled } from "react-icons/tb";
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

			<CustomFont $color='black' $font="1.5rem" $fontweight="bold">
				모집이 게시되었습니다!
			</CustomFont>
			<CustomFont $color='black' $font="1.5rem" $fontweight="bold">
				아래 링크를 공유해 모집을 시작해보세요!
			</CustomFont>
			<CustomRow $gap='1rem'>
				<TbArrowBigDownLinesFilled style={{ fontSize: '2rem' }} />
				<TbArrowBigDownLinesFilled style={{ fontSize: '2rem' }} />
			</CustomRow>

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
