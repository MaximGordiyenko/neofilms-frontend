import {
  Container, Grid, styled
} from "@mui/material";

export const ContainerCSS = styled(Container)`
  background: ${({ theme }) => theme.palette.grey[100]};
  margin: 7% auto;
  padding: 30px;
  border-radius: ${({ theme }) => theme.shape.radius};
  position: relative;
`;

export const Block = styled(Grid)`
  display: block;
  margin: 6% auto;
  width: 90%;
`;
