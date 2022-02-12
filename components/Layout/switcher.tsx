import React from "react";
import styled from "styled-components";
import { getAdjustedSpace } from "./helpers";

interface Props extends React.HTMLAttributes<HTMLElement> {
  /* A CSS width value (representing the 'container breakpoint') */
  threshold?: string;
  /* A CSS margin value */
  space?: string;
  /* A number representing the maximum number of items permitted for a horizontal layout */
  limit?: number;
  /* Styles for the intermediary wrapper*/
  containerClassName?: string;
}

const SwitcherContainer = styled.div<Props>(
  props => `
    display: block;

    & > * {
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        margin: calc(${props.space} / 2 * -1);
    }

    & > * > * {
        flex-basis: calc((${props.threshold} - (100% - ${props.space})) * 999);
        flex-grow: 1;
        margin: calc(${props.space} / 2);
    }

    & > * > :nth-last-child(n+${props.limit && props.limit + 1}),
    & > * > :nth-last-child(n+${props.limit && props.limit + 1}) ~ * {
        flex-basis: 100%;
    }`
);

export const Switcher: React.FC<Props> = ({
  threshold = "var(--measure)",
  space = "var(--s1)",
  limit = 4,
  children,
  containerClassName,
  ...rest
}) => {
  const props = {
    space: getAdjustedSpace(space),
    threshold,
    limit
  };

  return (
    <SwitcherContainer {...rest} {...props}>
      <div className={containerClassName}>{children}</div>
    </SwitcherContainer>
  );
};

export default Switcher;
