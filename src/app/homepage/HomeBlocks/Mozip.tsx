"use client";

import styled from "styled-components";
import CustomColumn from "@/components/CustomColumn";
import AddNewMozip from "../components/AddNewMozip";
import MozipProgressButton from "../components/MozipProgressButton";
import MozipDivider from "../components/MozipDivider";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import CustomFont from "@/components/CustomFont";
import { usePositionStore, Position } from "@/stores/usePositionStore";

interface MozipItem {
	id: string;
	title: string;
	description: string;
	startDate: string;
	endDate: string;
	isLoginRequired: boolean;
	isEditAvailable: boolean;
	descriptionBeforeMozip: string;
	descriptionAfterMozip: string;
}

interface MozipResponse {
	position: string;
	mozips: MozipItem[];
}

const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  width: 100%;
`;

const CustomColumnMargin = styled(CustomColumn)`
  margin-top: 1rem;
  min-height: 100vh;
`;

export default function Mozip() {
	const [mozipData, setMozipData] = useState<MozipItem[]>([]);
	const [loading, setLoading] = useState(true); // 로딩 상태 관리
	const token = localStorage.getItem("accessToken");
	const router = useRouter();
	const setPosition = usePositionStore(state => state.setPosition); // 유저 포지션 관리 zustand store 정의
	const position = usePositionStore(state => state.position); // zustand store에 잘 저장됐는지 확인하기 위한 변수

	useEffect(() => {
		const clubId = localStorage.getItem("selectedClubId");

		if (!clubId) {
			console.error("club_id가 localStorage에 없습니다.");
			setLoading(false);
			return;
		}

		const fetchMozipData = async () => {
			try {
				console.log("localStorage에서 가져온 club_id:", clubId);
				const response = await axios.get<MozipResponse>(
					`${process.env.NEXT_PUBLIC_SERVER_URL}/api/mozip?club_id=${clubId}`,
					{
						headers: {
							Authorization: `${token}`,
						},
					}
				);

				// position 정보를 store에 저장
				if (response.data.position) {
					setPosition(response.data.position as Position);
					console.log("저장된 position:", response.data.position); // API로 받은 position
        			console.log("zustand store의 position:", position); // store에 저장된 position
				}
				  
				setMozipData(response.data.mozips);
				console.log(response.data);
			} catch (error) {
				console.error("모집 데이터를 가져오는 중 오류 발생:", error);
			} finally {
				setLoading(false);
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

	const handleButtonClick = (mozipId: string) => {
		console.log("클릭한 mozipId는:", mozipId); // 디버깅용
		if (!mozipId) {
			console.error("mozipId가 없습니다!");
			return;
		}
		router.push(`/mozipResponse/${mozipId}`);
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
					onClick={() => handleButtonClick(item.id)} // 정확히 전달
				/>
			));

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!mozipData.length) {
		return (
			<CustomColumnMargin $width="80%" $alignitems="center" $justifycontent="flex-start">
				<AddNewMozip />
				<CustomFont $color="#666666" $font="1rem">아직 생성된 모집이 없네요.</CustomFont>
			</CustomColumnMargin>
		);
	}

	return (
		<CustomColumnMargin $width="80%" $alignitems="center" $justifycontent="flex-start" $gap="2rem">
			<AddNewMozip />
			<MozipDivider text="모집 전" hasAddNewMozip={true} />
			<ButtonWrapper>
				{renderProgressButtons(mozipData, (item) => new Date(item.startDate) > new Date())}
			</ButtonWrapper>
			<MozipDivider text="모집 중" hasAddNewMozip={true} />
			<ButtonWrapper>
				{renderProgressButtons(
					mozipData,
					(item) => new Date(item.startDate) <= new Date() && new Date() <= new Date(item.endDate)
				)}
			</ButtonWrapper>
			<MozipDivider text="서류 평가 중" hasAddNewMozip={true} />
			<ButtonWrapper>
				{renderProgressButtons(mozipData, (item) => new Date(item.endDate) < new Date())}
			</ButtonWrapper>
		</CustomColumnMargin>
	);
}