import { Container, Grid, styled } from "@mui/material";

export const ContainerCSS = styled(Container)(
  ({ theme, step }) => ({
  background: theme.palette.grey[100],
  margin: `${step ? 4 : 10}% auto`,
  padding: 30,
  borderRadius: 10,
  position: 'relative'
}));

export const Block = styled(Grid)`
  display: block;
  margin: 6% auto;
  width: 90%;
`;
