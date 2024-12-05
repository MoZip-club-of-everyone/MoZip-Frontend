"use client";

// 로그인 화면의 아이디 찾은 컴포넌트입니다.
// 담당자(담당 브랜치): hyuna -> nayeong

import CustomColumn from "@/components/CustomColumn";
import CustomButton from "@/components/CustomButton";
import CustomFont from "@/components/CustomFont";
import CustomRow from "@/components/CustomRow";

interface FindIDProps {
	setCurrentView: (view: "login" | "findPW") => void;
}

export default function FindID({ setCurrentView }: FindIDProps) {
	return (
		<>
			<CustomButton $width="auto" $backgroundColor="white" $border="1px solid black">
				<CustomFont $color="black" $font="1rem">LOGO</CustomFont>
			</CustomButton>

			<CustomColumn $width="80%" $alignitems="center" $justifycontent="center">
				<CustomRow $width="100%" $alignitems="center" $justifycontent="flex-start">
					<CustomFont $color="black" $font="1.7rem" $fontweight="bold">아이디 찾기</CustomFont>
				</CustomRow>

				<CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="center" $gap="1rem">
					<CustomRow $width="100%" $alignitems="flex-start" $justifycontent="center" $gap="0.5rem">
						<CustomFont $color="black" $font="1rem">이나영</CustomFont>
						<CustomFont $color="black" $font="1rem">님의 아이디는</CustomFont>
					</CustomRow>

					<CustomRow $width="100%" $alignitems="flex-start" $justifycontent="center" $gap="0.5rem">
						<CustomFont $color="black" $font="1rem">123@hufs.ac.kr</CustomFont>
						<CustomFont $color="black" $font="1rem">입니다.</CustomFont>
					</CustomRow>
				</CustomColumn>

				<CustomButton
					$width="100%"
					$alignItems="center"
					$justifyContent="center"
					$backgroundColor="#5296FF"
					onClick={() => setCurrentView("login")}
				>
					<CustomFont $color="white" $font="1.3em" $fontweight="bold">로그인</CustomFont>
				</CustomButton>

				<CustomButton
					$width="100%"
					$alignItems="center"
					$justifyContent="center"
					$backgroundColor="#5296FF"
					onClick={() => setCurrentView("findPW")}
				>
					<CustomFont $color="white" $font="1.3em" $fontweight="bold">비밀번호 찾기</CustomFont>
				</CustomButton>
			</CustomColumn>
		</>
	);
}
