import React from "react";
import styled from "styled-components";
import { getAdjustedSpace } from "./helpers";

interface Props extends React.HTMLAttributes<HTMLElement> {
  // Which element to treat as the sidebar
  // (all values but "left" are considered "right")
  side?: "left" | "right";
  // Represents the width of the sidebar when adjacent.
  // If not set (null) it defaults to the sidebar's content width
  sideWidth?: string;
  // A CSS percentage value. The minimum width of the
  // content element in the horizontal configuration
  contentMin?: string;
  // A CSS margin value representing the space between the two elements
  space?: string;
  // Make the adjacent elements adopt their natural height
  noStretch?: boolean;
  /* The element type of the container element*/
  component?: "div" | "span";
  /* Styles for the intermediary wrapper*/
  containerClassName?: string;
}

const SidebarContainer = styled.div<Props>(
  (props) => `
  & > * {
    display: flex;
    flex-wrap: wrap;
    margin: calc(${props.space} / 2 * -1);
    ${props.noStretch && "align-items: flex-start;"}
  }

  & > * > * {
    flex-grow: 1;
    margin: calc(${props.space} / 2);
    ${props.sideWidth && `flex-basis: ${props.sideWidth}`}
  }

  & > * > ${props.side !== "left" ? `:first-child` : `:last-child`} {
    flex-basis: 0;
    flex-grow: 999;
    min-width: calc(${props.contentMin} - ${props.space});`,
);

export const Sidebar: React.FC<Props> = ({
  side = "left",
  sideWidth,
  contentMin = "50%",
  space = "0",
  noStretch = false,
  children,
  component = "div",
  containerClassName = "",
  ...rest
}) => {
  const props = {
    space: getAdjustedSpace(space),
    side,
    sideWidth,
    contentMin,
    noStretch,
  };

  if (React.Children.count(children) != 2) {
    throw new Error(`<Sidebar /> should render two children`);
  }

  return (
    <SidebarContainer {...rest} {...props} as={component}>
      <div className={containerClassName}>{children}</div>
    </SidebarContainer>
  );
};

export default Sidebar;
