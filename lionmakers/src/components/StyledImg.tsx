import styled from 'styled-components';

// props 타입 정의
interface StyledImgProps {
    width?: string;
    height?: string;
    margin?: string;
    padding?: string;
    borderradius?: string;
    border?: string;
    cursor?: string;
}

// 타입 정의한 props를 styled-components에 전달
const StyledImg = styled.img<StyledImgProps>`
  width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.height || 'auto'};
  margin: ${(props) => props.margin || '0'};
  padding: ${(props) => props.padding || '0'};
  border-radius: ${(props) => props.borderradius || '0'};
  border: ${(props) => props.border || 'none'};
  cursor: ${(props) => props.cursor || 'none'};
`;

export default StyledImg;