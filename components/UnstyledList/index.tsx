import React from "react";
import styled from "styled-components";

const StyledUl = styled.ul`
  list-style: none;
  padding-inline-start: 0;
`;

type Props = {
  children: React.ReactNode;
};

export const UnstyledList = ({ children }: Props) => {
  return <StyledUl>{children}</StyledUl>;
};

export default UnstyledList;
