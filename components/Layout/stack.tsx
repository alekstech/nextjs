import React from "react";
import styled from "styled-components";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  /* A CSS margin value */
  space?: string;
  // Whether the spaces apply recursively (i.e. regardless of nesting level)
  recursive?: boolean;
  // The element after which to split the stack with an auto margin
  splitAfter?: number;
}

const StackContainer = styled.div<Props>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  & > * + * {
    margin-top: ${(props) => props.space};
  }

  & ${(props) => !props.recursive && `>`} * + * {
    margin-top: ${(props) => props.space};
  }

  ${(props) =>
    props.splitAfter &&
    `&:only-child {
      height: 100%;
    }`}

  & > :nth-child(${(props) => props.splitAfter}) {
    margin-bottom: auto;
  }
`;

export const Stack = ({
  space = "var(--s1)",
  recursive = false,
  children,
  ...rest
}: Props) => {
  const props = {
    space,
    recursive,
  };
  return (
    <StackContainer {...rest} {...props}>
      {children}
    </StackContainer>
  );
};

export default Stack;
