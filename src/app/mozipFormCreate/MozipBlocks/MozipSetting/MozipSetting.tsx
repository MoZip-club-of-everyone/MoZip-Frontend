import React, { useState } from "react";
import CustomColumn from "@/components/CustomColumn";
import CustomFont from "@/components/CustomFont";
import CustomRow from "@/components/CustomRow";
import CustomButton from "@/components/CustomButton";
import MozipSettingDate from "./MozipSettingDate";
import MozipSettingMessage from "./MozipSettingMessage";
import MozipSettingDetail from "./MozipSettingDetail";
import axios from "axios";

interface MozipSettingProps {
	onPublish: () => void;
	onPrev: () => void;
}

export default function MozipSetting({ onPublish, onPrev }: MozipSettingProps) {
	const [startDate, setStartDate] = useState<string | null>(null);
	const [endDate, setEndDate] = useState<string | null>(null);
	const [beforeMessage, setBeforeMessage] = useState<string>("");
	const [afterMessage, setAfterMessage] = useState<string>("");
	const [isLoginRequired, setIsLoginRequired] = useState<boolean>(false);
	const [isEditAllowed, setIsEditAllowed] = useState<boolean>(false);
	const [isInterviewRequired, setIsInterviewRequired] = useState<boolean>(false);

	const token = localStorage.getItem("accessToken");

	const clubId = localStorage.getItem("selectedClubId"); // 홈화면 > 동아리 진입 시 얻은 clubId

	// 모집 게시 처리
	const handlePublish = async () => {
		// localStorage에서 데이터 가져오기
		const title = localStorage.getItem("mozipTitle") || "제목 없음";
		const description = localStorage.getItem("mozipDescription") || "";
		const detailSettings = JSON.parse(localStorage.getItem("mozipDetailSettings") || "{}");
		const messageSettings = JSON.parse(localStorage.getItem("mozipMessageSettings") || "{}");
		const paperQuestions = JSON.parse(localStorage.getItem("mozipQuestions") || "[]");

		// API에 전달할 데이터 구성
		const requestData = {
			title,
			description,
			startDate,
			endDate,
			isLoginRequired: detailSettings.isLoginRequired || false,
			// isEditAllowed: detailSettings.isEditAllowed || false,
			isEditAvailable: detailSettings.isEditAllowed || false,
			descriptionBeforeMozip: messageSettings.preRecruitText || "",
			descriptionAfterMozip: messageSettings.postRecruitText || "",
			paperQuestions: paperQuestions.map((question: any) => ({
				type: question.type, // SHORT_ANSWER, LONG_ANSWER, ONE_CHOICE, MULTIPLE_CHOICE
				question: question.question,
				details: question.details,
				isRequired: question.isRequired,
			})),
		};

		try {

			console.log(requestData);
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/api/mozip?club_id=${clubId}`,
				requestData,
				{
					headers: {
						Authorization: `${token}`
						// "Content-Type": "application/json",
					},
				}
			);

			if (response.status == 200) {
				// 모집 생성 후 모집 ID 저장해두어야 함 
				alert("모집 생성 완료");
				console.log('토큰은:', token);
				console.log('클럽 ID는:', clubId);

				const mozipId = response.data.id;
				console.log('방금 생성한 모집의 mozipId는:', mozipId);

				localStorage.setItem("mozipId", mozipId);
				onPublish(); // 게시 후 이동
			}
		} catch (error) {
			console.error("모집 생성 실패:", error);
			alert("모집 생성에 실패했습니다.");
			console.log('토큰은:', token);
			console.log('클럽 ID는:', clubId);
			console.log('내가 보낸 요청 값은:', requestData);
		}
	};

	return (
		<CustomColumn $width="90%" $alignitems="center" $justifycontent="center">
			<MozipSettingDate
				onChangeStartDate={setStartDate}
				onChangeEndDate={setEndDate}
			/>
			<MozipSettingMessage
				onChangeBeforeMessage={setBeforeMessage}
				onChangeAfterMessage={setAfterMessage}
			/>
			<MozipSettingDetail
				onChangeLoginRequired={setIsLoginRequired}
				onChangeEditAllowed={setIsEditAllowed}
				onChangeInterviewRequired={setIsInterviewRequired}
			/>

			<CustomRow $width="100%" $alignitems="center" $justifycontent="flex-end">
				<CustomButton
					$width="5rem"
					$backgroundColor="white"
					$padding="1rem"
					$border="1px solid black"
					onClick={onPrev}
				>
					<CustomFont $color="black" $font="1rem">
						이전
					</CustomFont>
				</CustomButton>
				<CustomButton
					$width="7rem"
					$backgroundColor="#5296FF"
					$padding="1rem"
					onClick={handlePublish}
				>
					<CustomFont $color="white" $font="1rem">
						모집 게시
					</CustomFont>
				</CustomButton>
			</CustomRow>
		</CustomColumn>
	);
}
