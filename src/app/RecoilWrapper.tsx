// recoil은 클라이언트 사이드 컴포넌트이기 때문에 layout.tsx에서 recoil을 사용하기 위한 조치

"use client";
import { RecoilRoot } from "recoil";

interface RecoilRootWrapperProps {
	children: React.ReactNode;
}

export default function RecoilRootWrapper({
	children,
}: RecoilRootWrapperProps) {
	return <RecoilRoot>{children}</RecoilRoot>;
}