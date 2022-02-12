import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

interface Props extends React.HTMLAttributes<HTMLElement> {
  /* A CSS pixel value representing x in minmax(min(x, 100%), 1fr).
   * Note, if you have explicitly defined widths of grid elements,
   * then this value should be greater than that value. */
  min?: string;
  /* The space between grid cells */
  space?: string;
}

const StyledGrid = styled.div<Props & { aboveMin: boolean }>(
  props => `
  display: grid;
  grid-column-gap: ${props.space};
  grid-template-columns: ${
    props.aboveMin ? `repeat(auto-fill, minmax(${props.min}, 1fr))` : `1fr`
  };

  // Only safari currently https://developer.mozilla.org/en-US/docs/Web/CSS/min
  @supports (width: min(${props.min}, 100%)) {
    grid-gap: ${props.space};
    grid-template-columns: repeat(auto-fit, minmax(min(${
      props.min
    }, 100%), 1fr));
   }

`
);

export const Grid: React.FC<Props> = ({
  min = "250px",
  space = "var(--s0)",
  children,
  ...rest
}) => {
  const gridNode = useRef(null);

  const [aboveMin, setAboveMin] = useState<boolean>(true);

  if (min.slice(-2) !== "px") {
    throw new Error(
      "min must be a pixel length value, please convert your value"
    );
  }
  useEffect(() => {
    if (window.ResizeObserver) {
      const ro = new window.ResizeObserver((entries: ResizeObserverEntry[]) => {
        entries.forEach((entry: ResizeObserverEntry) => {
          const cr = entry.contentRect;
          const isWide = cr.width > Number.parseInt(min.split("px")[0]);
          setAboveMin(isWide);
        });
      });
      ro.observe((gridNode as any).current);
    }
  }, []);

  const props = {
    min,
    space
  };
  return (
    <StyledGrid {...props} {...rest} aboveMin={aboveMin} ref={gridNode}>
      {children}
    </StyledGrid>
  );
};

export default Grid;
