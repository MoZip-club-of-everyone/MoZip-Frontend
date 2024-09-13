import styled from "styled-components";

// props 타입 정의
interface CustomButtonProps {
    width?: string;
    height?: string;
    gap?: string;
    display?: string;
    alignitems?: string;
    justifycontent?: string;
    margin?: string;
    padding?: string;
    backgroundcolor?: string;
    color?: string;
    border?: string;
    borderradius?: string;
    hoverBackgroundColor?: string;
    hoverOpacity?: string;
}

const CustomButton = styled.button<CustomButtonProps>`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "3rem"};
  gap: ${(props) => props.gap || "1rem"};
  display: ${(props) => props.display || "flex"};
  align-items: ${(props) => props.alignitems || "center"};
  justify-content: ${(props) => props.justifycontent || "center"};
  margin: ${(props) => props.margin || "0"};
  padding: ${(props) => props.padding || "0.75rem 1.5rem"};
  background: ${(props) => props.backgroundcolor || "#AFAFAF"};
  color: ${(props) => props.color || "black"};
  border: ${(props) => props.border || "none"};
  border-radius: ${(props) => props.borderradius || "0.5rem"};
  cursor: pointer;
  transition: opacity 0.1s ease-in-out;

  /* Hover 스타일링 */
  &:hover {
    background: ${(props) => props.hoverBackgroundColor || "orange"};
    opacity: 0.7;
  }
`;

export default CustomButton;