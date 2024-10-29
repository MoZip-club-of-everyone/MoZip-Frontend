"use client";

// 수정 금지
// layout.tsx에서 theme을 사용하기 위한 조치

import { ThemeProvider } from "styled-components";
import { theme } from "@/app/theme";

export default function ThemeProviderWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
