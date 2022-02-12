import React from "react";
import styled from "styled-components";

interface Props extends React.HTMLAttributes<HTMLElement> {
  /* The element's aspect ratio, width and height
   * (in that order) delimited by a colon (ex. `4:3`) */
  ratio?: string;
}

const StyledFrame = styled.div<Props>`
  display: block;
  position: relative;
  padding-bottom: ${props => {
    const ratio = (props.ratio && props.ratio.split(":")) || "";
    return `calc(${ratio[1]} / ${ratio[0]} * 100%)`;
  }};

  & > * {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  & > img,
  & > video {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

export const Frame: React.FC<Props> = ({
  ratio = "16:9",
  children,
  ...rest
}) => {
  const props = {
    ratio,
    ...rest
  };
  if (React.Children.count(children) > 1) {
    console.warn("<Frame /> elements should have just one child");
  }

  return <StyledFrame {...props}>{children}</StyledFrame>;
};

export default Frame;
