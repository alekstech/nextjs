import React from "react";
import styled from "styled-components";
import { Property } from "csstype";

interface Props extends React.HTMLAttributes<HTMLElement> {
  justify?: Property.JustifyContent;
  align?: Property.AlignItems;
  /* A CSS margin value. The minimum space between the clustered child elements. */
  space?: string;
}

const StyledCluster = styled.div<Props>`
  & :first-child {
    margin-top: calc(${(props) => props.space} / 2);
  }
  & :last-child {
    margin-bottom: calc(${(props) => props.space} / 2);
  }
  & > * {
    display: flex;
    flex-wrap: wrap;
    justify-content: ${(props) => props.justify};
    align-items: ${(props) => props.align};
    margin: calc(${(props) => props.space} / 2 * -1);
  }
`;

export const Cluster: React.FC<Props> = ({
  justify,
  align,
  space = "0px",
  children,
  ...rest
}) => {
  const props = {
    justify,
    align,
    space,
  };
  return (
    <StyledCluster {...rest} {...props}>
      <div>{children}</div>
    </StyledCluster>
  );
};

export default Cluster;
