import React from "react";
import styled from "styled-components";

interface Props extends React.HTMLAttributes<HTMLElement> {
  /* A CSS padding value */
  padding?: string;
  /* A CSS border-width value */
  borderWidth?: string;
}

const StyledBox = styled.div<Props>(
  (props) => `
    padding: ${props.padding};
    border: ${props.borderWidth} solid;
    background-color: inherit;
`,
);

export const Box: React.FC<Props> = ({
  padding,
  borderWidth,
  children,
  ...rest
}) => {
  const props = {
    padding,
    borderWidth,
  };
  return (
    <StyledBox {...props} {...rest}>
      {children}
    </StyledBox>
  );
};

export default Box;
