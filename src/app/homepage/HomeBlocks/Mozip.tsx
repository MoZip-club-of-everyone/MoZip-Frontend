"use client";

import styled from "styled-components";
import CustomColumn from "@/components/CustomColumn";
import AddNewMozip from "../components/AddNewMozip";
import MozipProgressButton from "../components/MozipProgressButton";
import MozipDivider from "../components/MozipDivider";
import { useEffect, useState } from "react";
import axios from "axios";

// 타입 정의
interface MozipItem {
	id: string;
	title: string;
	startDate: string;
	endDate: string;
}

// 버튼들을 감싸는 래퍼 스타일
const ButtonWrapper = styled.div`
	display: flex;
	flex-wrap: wrap; /* 너비 초과 시 행 바꿈 */
	gap: 1rem; /* 버튼 간 간격 */
	justify-content: center; /* 중앙 정렬 */
	width: 100%; /* 부모 컨테이너 너비 채움 */
`;

const CustomColumnMargin = styled(CustomColumn)`
	margin-top: 1rem;
	min-height: 100vh;
`;

export default function Mozip() {
	const [mozipData, setMozipData] = useState<MozipItem[]>([]);
	const [currentTime, setCurrentTime] = useState<Date>(new Date());
	const token = localStorage.getItem("accessToken");

	// mockData를 위한 clubId
	const clubId = "01JJVD9F4RMC9XQX7BWWXSKECA";

	useEffect(() => {
		const fetchMozipData = async () => {
			try {
				console.log(token);
				const response = await axios.get<MozipItem[]>(
					`${process.env.NEXT_PUBLIC_SERVER_URL}/api/mozip?club_id=${clubId}`,
					{
						headers: {
							Authorization: `${token}`,
						},
					}
				);
				setMozipData(response.data);
			} catch (error) {
				console.error("특정 동아리의 모집 목록 조회 실패:", error);
			}
		};

		fetchMozipData();
	}, []);

	const formatDate = (dateString: string): string => {
		const date = new Date(dateString);
		return `${date.getFullYear()}년${String(date.getMonth() + 1).padStart(2, "0")}월${String(
			date.getDate()
		).padStart(2, "0")}일`;
	};

	const renderProgressButtons = (
		data: MozipItem[],
		filterCondition: (item: MozipItem) => boolean
	): JSX.Element[] =>
		data
			.filter(filterCondition)
			.map((item) => (
				<MozipProgressButton
					key={item.id}
					title={item.title}
					startDate={formatDate(item.startDate)}
					endDate={formatDate(item.endDate)}
				/>
			));

	return (
		<CustomColumnMargin $width="80%" $alignitems="center" $justifycontent="flex-start" $gap="2rem">
			<AddNewMozip />
			<MozipDivider text="모집 전" hasAddNewMozip={true} />
			<ButtonWrapper>
				{renderProgressButtons(mozipData, (item) => new Date(item.startDate) > currentTime)}
			</ButtonWrapper>
			<MozipDivider text="모집 중" hasAddNewMozip={true} />
			<ButtonWrapper>
				{renderProgressButtons(
					mozipData,
					(item) => new Date(item.startDate) <= currentTime && currentTime <= new Date(item.endDate)
				)}
			</ButtonWrapper>
			<MozipDivider text="서류 평가 중" hasAddNewMozip={true} />
			<ButtonWrapper>
				{renderProgressButtons(mozipData, (item) => new Date(item.endDate) < currentTime)}
			</ButtonWrapper>
		</CustomColumnMargin>
	);
}
