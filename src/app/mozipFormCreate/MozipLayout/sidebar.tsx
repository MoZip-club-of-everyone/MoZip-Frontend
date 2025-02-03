"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";

import CustomFont from "@/components/CustomFont";
import CustomDivider from "@/components/CustomDivider";
import CustomRow from "@/components/CustomRow";
import CustomColumn from "@/components/CustomColumn";
import CustomButton from "@/components/CustomButton";

import { HiOutlineHome } from "react-icons/hi";
import { BsEnvelope } from "react-icons/bs";
import { IoNewspaperOutline } from "react-icons/io5";
import { FaRegAddressCard } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";

// 담당자: 나영
// Figma : 모집폼 관리 > 좌측 네비게이션 바 (사이드바) 파일입니다.

const CustomSideBarMenu = styled(CustomColumn)`
  padding-top: 3rem;
`;

export default function SideBar() {
	const router = useRouter();

	return (
		<CustomRow $height="100vh" $gap="0" $alignitems="flex-start">
			<CustomSideBarMenu $height="80vh" $justifycontent="space-between">

				<CustomColumn $width="auto" $gap="1rem">
					<CustomButton $backgroundColor="transparent" onClick={() => router.push("/")}>
						<CustomColumn $width='auto' $gap="0.5rem">
							<HiOutlineHome style={{ fontSize: '1.5rem' }} />
							<CustomFont $color="black" $font="0.6rem">
								모집
							</CustomFont>
						</CustomColumn>
					</CustomButton>

					<CustomButton $backgroundColor="transparent" onClick={() => router.push("/mozipFormCreate")}>
						<CustomColumn $width='auto' $gap="0.5rem">
							<BsEnvelope style={{ fontSize: '1.5rem' }} />
							<CustomFont $color="black" $font="0.6rem">
								모집폼 관리
							</CustomFont>
						</CustomColumn>
					</CustomButton>

					<CustomButton $backgroundColor="transparent" onClick={() => router.push("/manage")}>
						<CustomColumn $width='auto' $gap="0.5rem">
							<IoNewspaperOutline style={{ fontSize: '1.5rem' }} />
							<CustomFont $color="black" $font="0.6rem">
								지원서 관리
							</CustomFont>
						</CustomColumn>
					</CustomButton>

					<CustomButton $backgroundColor="transparent" onClick={() => router.push("/manage")}>
						<CustomColumn $width='auto' $gap="0.5rem">
							<FaRegAddressCard style={{ fontSize: '1.5rem' }} />
							<CustomFont $color="black" $font="0.6rem">
								합불 관리
							</CustomFont>
						</CustomColumn>
					</CustomButton>
				</CustomColumn>

				<CustomButton $backgroundColor="transparent">
					<IoExitOutline style={{ fontSize: '1.5rem' }} />
				</CustomButton>

			</CustomSideBarMenu>
			<CustomDivider $width="1px" $height="100vh" $backgroundcolor="#D8D8D8" />
		</CustomRow>
	);
}
