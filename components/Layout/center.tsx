import React from "react";
import styled from "styled-components";

interface Props extends React.HTMLAttributes<HTMLElement> {
  /* A CSS max-width value */
  max?: string;
  /* Center align the text too (text-align: center) */
  andText?: boolean;
  /* The minimum space on either side of the content */
  gutters?: number;
  /* Center child elements based on their content width */
  intrinsic?: boolean;
}

const CenterContainer = styled.div<Props>`
  display: block;
  box-sizing: content-box;
  max-width: ${props => props.max};

  margin-left: auto;
  margin-right: auto;

  padding-left: ${props => props.gutters};
  padding-right: ${props => props.gutters};

  ${props => props.andText && `
    text-align: center;
  `}

  ${props => props.intrinsic && `
    display: flex;
    flex-direction: column;
    align-items: center;
  `}
`;

export const Center: React.FC<Props> = ({
  max = "var(--measure)",
  andText = false,
  gutters = 0,
  intrinsic = false,
  children,
  ...rest
}) => {
  const props = {
    max,
    andText,
    gutters,
    intrinsic
  };
  return (
    <CenterContainer {...props} {...rest}>
      {children}
    </CenterContainer>
  );
};

export default Center;
