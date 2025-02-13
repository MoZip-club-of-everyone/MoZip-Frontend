"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styled from "styled-components";
import Image from "next/image";
import headerLogo from "@/assets/logo/headerLogo.svg";

import DefaultInfo from "./DefaultInfo";
import AllQuestion from "./AllQuestion";

import CustomFont from "@/components/CustomFont";
import CustomBox from "@/components/CustomBox";
import CustomRow from "@/components/CustomRow";
import CustomButton from "@/components/CustomButton";
import CustomDivider from "@/components/CustomDivider";
import CustomColumn from "@/components/CustomColumn";

interface MoxipDetail {
	id: string;
	title: string;
	description: string;
	startDate: string;
	endDate: string;
	descriptionBeforeMozip: string;
	descriptionAfterMozip: string;
	loginRequired: boolean;
	editAvailable: boolean;
	images?: { id: string; url: string; description?: string }[];
}

export default function MozipResponsePage() {
	const [moxipDetail, setMoxipDetail] = useState<MoxipDetail | null>(null);
	const [moxipError, setMoxipError] = useState<string | null>(null);
	const [submissionStatus, setSubmissionStatus] = useState<"default" | "success" | "error">("default"); // ✅ 상태 추가

	const params = useParams();
	const mozipId = Array.isArray(params.mozipId) ? params.mozipId[0] : params.mozipId || "";

	useEffect(() => {
		if (mozipId) {
			fetchMoxipDetail(mozipId);
		}
	}, [mozipId]);

	const fetchMoxipDetail = async (mozipId: string) => {
		const token = localStorage.getItem("accessToken");
		if (!token) {
			setMoxipError("Authorization token is missing.");
			return;
		}

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/api/mozip/${mozipId}`,
				{
					headers: {
						Authorization: `${token}`,
					},
				}
			);

			if (!response.ok) {
				throw new Error("Failed to fetch Moxip details.");
			}

			const data = await response.json();
			setMoxipDetail(data);
		} catch (err) {
			setMoxipError((err as Error).message);
		}
	};

	if (moxipError) {
		return <div>Error: {moxipError}</div>;
	}

	if (!moxipDetail) {
		return;
	}

	return (
		<Wrapper>
			<CustomRow $width="100%" $alignitems="center" $justifycontent="space-between">
				<Image src={headerLogo} alt="logo" />
				<CustomButton $width="auto" $height="auto" $padding="0" $backgroundColor="transparent">
					<CustomFont $color="black">로그인</CustomFont>
				</CustomButton>
			</CustomRow>

			<CustomDivider $width="100%" $height="1px" $backgroundcolor="#D9D9D9" />
			<CustomRow $width="100%" $justifycontent="flex-start" $alignitems="center">
				<CustomFont $color="black" $font="1.5rem" $fontweight="bold">{moxipDetail.title}</CustomFont>
			</CustomRow>

			<CustomColumn $width="100%" $gap="0.5rem">
				<CustomDivider $width="100%" $height="1px" $backgroundcolor="#D9D9D9" />
				<CustomRow $width="100%" $justifycontent="flex-end" $alignitems="center">
					<CustomFont $color="black" $font="1rem">로그인 시 자동 저장됩니다.</CustomFont>
				</CustomRow>
				<CustomColumn $height="1rem" />
			</CustomColumn>

			<CustomBox
				$width="100%"
				$backgroundcolor="white"
				$padding="1rem"
				$overflowx="hidden"
				$overflowy="hidden"
				$border="1px solid #D9D9D9"
				$alignitems="flex-start"
				$justifycontent="center"
				$flexdirection="column"
				$gap="0.5rem"
				$boxshadow="7px 7px 10px rgba(0.1, 0.1, 0.1, 0.3)"
			>
				<CustomFont $color="#666666" $fontweight="bold" $font="1rem">{moxipDetail.description}</CustomFont>
			</CustomBox>

			<CustomDivider $width="100%" $height="1px" $backgroundcolor="#D9D9D9" />

			{/* "다음" 버튼 클릭 후 API 응답 상태에 따라 렌더링 변경 */}
			{submissionStatus === "default" && (
				<DefaultInfo mozipId={mozipId} setSubmissionStatus={setSubmissionStatus} />
			)}
			{submissionStatus === "success" && <AllQuestion mozipId={mozipId} />}
			{submissionStatus === "error" && (
				<CustomFont $color="red" $font="1.2rem" $fontweight="bold">
					앗, 지금은 응답할 수 없나봐요.
				</CustomFont>
			)}
		</Wrapper>
	);
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  width: 80%;
  min-height: 100vh;
  margin: auto;
  justify-content: flex-start;
`;
