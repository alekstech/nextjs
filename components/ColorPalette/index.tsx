import styled from "styled-components";

const StyledFrame = styled.div`
  display: flex;
  width: 100%;
  height: 1rem;
`;

interface StyledPanelProps {
  colorValue?: string;
}

const StyledPanel = styled.div<StyledPanelProps>`
  flex-grow: 1;
  background-color: ${(props) => {
    return props.colorValue || "";
  }};
`;

type ColorPaletteProps = {
  colors: string[];
};

export const ColorPalette = (props: ColorPaletteProps) => {
  return (
    <StyledFrame>
      {props.colors.map((color) => (
        <StyledPanel colorValue={color} key={color} />
      ))}
    </StyledFrame>
  );
};

export default ColorPalette;
