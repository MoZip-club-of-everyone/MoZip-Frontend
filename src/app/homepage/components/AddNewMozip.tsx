"use client";

import CustomFont from "@/components/CustomFont";
import CustomRow from "@/components/CustomRow";
import CustomButton from "@/components/CustomButton";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { usePositionStore } from "@/stores/usePositionStore";

// 담당자: 현아 -> 나영
// 홈화면 > 각 동아리별 Mozip 홈화면 컴포넌트의 버튼입니다.

export default function AddNewMozip() {
	const router = useRouter();
	const hasPermission = usePositionStore(state => state.hasPermission);

	// MANAGER 이상의 권한이 없으면 null을 반환 (버튼을 렌더링하지 않음)
	if (!hasPermission('관리')) {
		return null;
	}

	return (

		<CustomRow $width="100%" $alignitems="center" $justifycontent="flex-end">
			<CustomButton $width='8rem' $flexDirection="row" $backgroundColor="#5296FF" $padding="0.2rem 0.5rem"
				$alignItems="center" $justifyContent="center" onClick={() => router.push("/mozipFormCreate")}>
				<FaPlus style={{ color: 'white', fontSize: '1rem' }} />
				<CustomFont>새로운 모집</CustomFont>
			</CustomButton>
		</CustomRow>

	);
}
