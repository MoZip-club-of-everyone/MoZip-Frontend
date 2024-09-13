import styled from 'styled-components';

// props 타입 정의
interface CustomColumnProps {
    width?: string;
    height?: string;
    gap?: string;
    alignitems?: string;
    justifycontent?: string;
    margin?: string;
    padding?: string;
}

// 타입 정의한 props를 styled-components에 전달
const CustomColumn = styled.div<CustomColumnProps>`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.height || 'auto'};
  gap: ${(props) => props.gap || '30px'};
  align-items: ${(props) => props.alignitems || 'center'};
  justify-content: ${(props) => props.justifycontent || 'center'};
  margin: ${(props) => props.margin || '0'};
  padding: ${(props) => props.padding || '0'};
`;

export default CustomColumn;