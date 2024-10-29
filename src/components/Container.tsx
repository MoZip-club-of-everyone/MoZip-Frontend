"use client";

import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5rem;
  min-height: 100vh;
  padding: 1rem 10vh 10rem;
`;

export default function Container({
	children,
}: {
	children: React.ReactNode;
}) {
	return <StyledContainer>{children}</StyledContainer>;
}