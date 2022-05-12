import React from "react";
import styled from "styled-components";

interface Props extends React.HTMLAttributes<HTMLElement> {
  /* Centered element */
  centered?: React.ElementType;
  /* The minimum space between and around all of the child elements */
  space?: string;
  /* The minimum height */
  minHeight?: string;
  /* Whether the spacing is also applied as padding to the container element */
  noPad?: boolean;
}

const StyledCover = styled.div<Props>(
  props => `
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  min-height: calc(var(--dvh, 1vh) * 100);
  padding: ${props.noPad ? "0" : "var(--s1)"};

  & > * {
    margin-top: ${props.space};
    margin-bottom: ${props.space};
  }

  & > :first-child:not(${props.centered}) {
    margin-top: 0;
  }

  & > :last-child:not(${props.centered}) {
    margin-bottom: 0;
  }

  & > ${props.centered} {
      margin-top: auto;
      margin-bottom: auto;
  }

`
);

export const Cover: React.FC<Props> = ({
  centered = "h1",
  space,
  children,
  ...rest
}) => {
  const props = {
    centered,
    space
  };

  return (
    <StyledCover {...rest} {...props}>
      {children}
    </StyledCover>
  );
};

export default Cover;
