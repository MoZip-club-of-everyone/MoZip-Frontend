"use client";

// Figma 좌측 네비게이션 바에서 [ 모집폼 관리] 클릭하여 나타나는 화면입니다.
// 담당자(담당 브랜치): hyuna

// 홈 -> 동아리 페이지의 동아리 사진 컴포넌트

import styled from "styled-components";

interface CustomImageProps {
  src?: string;
  alt?: string;
}
const ImageWrapper = styled.div`
  width: 100%;
  height: 260px;
  border: 1px solid black; /* 테두리 */
  border-radius: 20px; /* 모서리를 이미지와 일치 */
  overflow: hidden; /* 테두리를 넘는 이미지를 숨김 */
  background-color: #f0f0f0;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// const Image = styled.img`
//   width: 100%;
//   height: 260px;
//   object-fit: cover;
//   border-radius: 20px;
//   border: 1px solid black;
//   background-color: #f0f0f0;
// `;

const Placeholder = styled.div`
  width: 100%;
  height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: #999;
  background-color: #f0f0f0;
  border-radius: 20px;
  border: 1px solid black;
`;

const CustomImage = ({ src, alt = "동아리이미지" }: CustomImageProps) => {
    return (
      src ? (
        <ImageWrapper>
          <Image src={src} alt={alt} />
        </ImageWrapper>
      ) : (
        <Placeholder>{alt}</Placeholder>
      )
    );
  };

export default CustomImage;
