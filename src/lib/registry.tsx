'use client'

// 수정금지
// FOUC 문제 해결을 위한 파일

import React, { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

export default function StyledComponentsRegistry({
	children,
}: {
	children: React.ReactNode
}) {
	// Only create stylesheet once with lazy initial state
	// x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
	const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())

	useServerInsertedHTML(() => {
		const styles = styledComponentsStyleSheet.getStyleElement()
		styledComponentsStyleSheet.instance.clearTag()
		return <>{styles}</>
	})

	if (typeof window !== 'undefined') return <>{children}</>

	return (
		<StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
			{children}
		</StyleSheetManager>
	)
}