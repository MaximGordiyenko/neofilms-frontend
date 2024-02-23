import {
  Container, Grid, styled
} from "@mui/material";

export const ContainerCSS = styled(Container)`
  background: ${({ theme }) => theme.palette.common.white};
  margin: 7% auto;
  padding: 10px;
  border-radius: ${({ theme }) => theme.shape.radius};
  position: relative;
`;

export const Block = styled(Grid)`
  display: block;
  margin: 6% auto;
  width: 90%;
`;
