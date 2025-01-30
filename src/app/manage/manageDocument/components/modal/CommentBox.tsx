import React from "react";
import styled from "styled-components";

interface CommentBoxProps {
  name: string;
  date: string;
  content: string;
}
export default function CommentBox({
  name,
  date,
  content,
}: CommentBoxProps): JSX.Element {
  return (
    <CommentBoxWrapper>
      <Header>
        <Name>{name}</Name>
        <Date>{date}</Date>
      </Header>
      <Content>{content}</Content>
    </CommentBoxWrapper>
  );
}
const CommentBoxWrapper = styled.div`
  border: 1px solid #223f6b;
  border-radius: 16px;
  padding: 16px;
  background: #fff;
  // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 8px;
  margin-bottom: 8px;
`;

const Name = styled.div`
  font-size: 11px;
  font-weight: bold;
`;

const Date = styled.div`
  font-size: 11px;
  color: #888;
`;

const Content = styled.div`
  font-size: 11px;
  line-height: 1.6;
  color: #333;
`;
