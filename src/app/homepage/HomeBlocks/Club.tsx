"use client";

// 담당자: 현아
// Figma : 홈 > [ 동아리 ] 탭 클릭 시 나타나는 컴포넌트입니다.
// 동아리에 대한 설명을 작성하는 컴포넌트 파일입니다.

import CustomColumn from "@/components/CustomColumn";
// import CustomRow from "@/components/CustomRow";
import CustomDivider from "@/components/CustomDivider";
import CustomCard from "../components/CustomCard";
import AddClubButton from "../components/AddClubButton"; // + 버튼 컴포넌트
import styled from "styled-components";

// 동아리 데이터를 배열로 관리
const clubs = [
  {
    imageSrc: "path/to/image1.jpg",
    name: "최대 15글자까지 보이는 동아리명최대 15글자",
    details: ["관리자: 김강민", "3개의 모집폼"],
  },
  {
    imageSrc: "path/to/image2.jpg",
    name: "다른 동아리명",
    details: ["관리자: 김영희", "5개의 모집폼"],
  },
  {
    imageSrc: "path/to/image3.jpg",
    name: "세 번째 동아리",
    details: ["관리자: 이철수", "2개의 모집폼"],
  },
  {
    imageSrc: "path/to/image4.jpg",
    name: "네 번째 동아리",
    details: ["관리자: 박민지", "1개의 모집폼"],
  },
  {
    imageSrc: "path/to/image5.jpg",
    name: "다섯 번째 동아리",
    details: ["관리자: 최현우", "4개의 모집폼"],
  },
];

const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); // 3개의 열
  gap: 107px; // 항목 간 간격
  /* gap: 1rem;
  padding: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  max-width: 800px; */
`

export default function Club() {
  // 최대 6개까지만 표시
  const displayedClubs = clubs.slice(0, 6);
  const shouldShowAddButton = displayedClubs.length < 6;

  return (
    <CustomColumn $width="100%" $alignitems="center" $justifycontent="center">
      <CustomDivider $width="100%" $height="1px" $backgroundcolor="#D8D8D8" />

      <Layout>
        {displayedClubs.map((club, index) => (
          <CustomCard
            key={index}
            imageSrc={club.imageSrc}
            clubName={club.name}
            clubDetails={club.details}
          />
        ))}

        {shouldShowAddButton && (
          <AddClubButton key="add-club" /> // + 버튼 컴포넌트
        )}
      </Layout>
    </CustomColumn>
  );
}

// "use client";

// import CustomColumn from "@/components/CustomColumn";
// import CustomFont from "@/components/CustomFont";
// import CustomRow from "@/components/CustomRow";
// import CustomDivider from "@/components/CustomDivider";

// import CustomCard from "../components/CustomCard";
// import CustomImage from "../components/CustomImage";
// import CustomInformation from "../components/CustomInformation";


// export default function Club() {

// 	return (

// 		<CustomColumn $width="100%" $alignitems="center" $justifycontent="center">
//             <CustomDivider $width="100%" $height="1px" $backgroundcolor="#D8D8D8" />
//             <CustomRow $gap="1rem" $padding="2rem">
//                 {/* 예시로 CustomCard 여러 개 */}
//                 <CustomCard>
//                     <CustomImage 
//                         src="path/to/image.jpg" 
//                         alt="동아리 대표 이미지" 
//                     />
//                     <CustomInformation 
//                         name="최대 15글자까지 보이는 동아리명" 
//                         details={["관리자: 김강민", "3개의 모집폼"]}
//                     />
//                 </CustomCard>
                
//                 <CustomCard>
//                     <CustomImage 
//                         src="path/to/image.jpg" 
//                         alt="동아리 대표 이미지" 
//                     />
//                     <CustomInformation 
//                         name="다른 동아리명" 
//                         details={["관리자: 김강민", "3개의 모집폼"]}
//                     />
//                 </CustomCard>
                
//                 {/* 추가로 필요한 경우 더 많은 CustomCard 컴포넌트 삽입 가능 */}
//             </CustomRow>

// 			{/* <CustomDivider $width="100%" $height="1px" $backgroundcolor="#D8D8D8" />

// 			<CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="center" $gap="0.5rem">
// 				<CustomRow $width="100%" $justifycontent="flex-start">
// 					<CustomFont $color='red' $font='1rem' $fontweight="bold">*</CustomFont>
// 					<CustomFont $color='black' $font='1rem' $fontweight="bold">모집 제목</CustomFont>
// 				</CustomRow>
// 				<MozipBlockInput
// 					$placeholder="Text"
// 					$highlightcolor="#8BB9FF"
// 					$width="100%"
// 					$height="3rem"
// 				/>
// 			</CustomColumn>

// 			<CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="center" $gap="0.5rem">
// 				<CustomRow $width="100%" $justifycontent="flex-start">
// 					<CustomFont $color='red' $font='1rem' $fontweight="bold">*</CustomFont>
// 					<CustomFont $color='black' $font='1rem' $fontweight="bold">모집 설명</CustomFont>
// 				</CustomRow>
// 				<MozipBlockTextarea
// 					$placeholder="내용을 입력해 주세요."
// 					$highlightcolor="#8BB9FF"
// 					$width="100%"
// 					$height="20rem"
// 					maxLength={1000}
// 				/>
// 			</CustomColumn>

// 			<CustomRow $width="100%" $alignitems="center" $justifycontent="flex-end">
// 				<CustomButton $width="5rem" $backgroundColor="#5296FF" $padding="1rem">
// 					<CustomFont $color="white" $font="1rem">
// 						다음
// 					</CustomFont>
// 				</CustomButton>
// 			</CustomRow> */}
// 		</CustomColumn>

// 	);
// }