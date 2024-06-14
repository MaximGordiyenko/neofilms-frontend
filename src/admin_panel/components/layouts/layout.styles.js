import { styled } from "@mui/material/styles";
import NeoLogoBG from '../../assets/neoLogoBG.png';

export const LayoutContainerCSS = styled('section')`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
  position: relative;
  
  &::before {
    content: '';
    background: url(${NeoLogoBG}) repeat;
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;
