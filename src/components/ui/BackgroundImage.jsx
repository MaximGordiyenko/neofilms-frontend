import { styled } from "@mui/material/styles";
import NeoLogoBG from '../../assets/neoLogoBG.png';

export const BackgroundImage = () => {
  return (
    <Image/>
  );
};

export const Image = styled('div')`
  background: url(${NeoLogoBG}) repeat 50% 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: -1;
`;
