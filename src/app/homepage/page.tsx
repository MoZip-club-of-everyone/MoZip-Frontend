"use client";

// 로딩 시 첫화면 (메인화면)
// 담당자(담당 브랜치): hyuna
import HomeButton from "./components/HomeButton";

export default function Home() {
	const handleLoginClick = () => {
		console.log('Login/Logout clicked');
	  };

	return (
		<div>
			여기는 홈페이지 입니다.
			<HomeButton isLoggedIn={false} onClick={handleLoginClick} />
		</div>
	);
}
