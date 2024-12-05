"use client";

import styled from 'styled-components';

interface LoginButtonProps {
  isLoggedIn: boolean;
  onClick: () => void;
}

const HomeButton = ({ isLoggedIn, onClick }: LoginButtonProps) => {
  return <StyledButton onClick={onClick}>{isLoggedIn ? '로그아웃' : '로그인'}</StyledButton>;
};

export default HomeButton;

const StyledButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;
