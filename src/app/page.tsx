// 수정금지

import { redirect } from 'next/navigation';

export default function Home() {
	// '/' 경로에 접근 시 '/homepage'로 리다이렉트
	redirect('/homepage');
}
