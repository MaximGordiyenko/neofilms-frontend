import {
  Container,
  FormLabel,
  InputLabel,
  Grid,
  TextField,
  styled,
  Box,
  Typography,
  Dialog,
} from "@mui/material";
import { Link } from "react-router-dom";

export const ContainerCSS = styled(Container)`
  background: ${({ theme }) => theme.palette.common.white};
  margin: 7% auto;
  padding: 10px;
  border-radius: ${({ theme }) => theme.shape.radius};
  position: relative;
`;

export const BlockCSS = styled(Box)`
  padding: 3% 6%;
  background: ${({ bg }) => bg ? '#1c212e' : '#0e121a'};
`;

export const Block = styled(Grid)`
  display: block;
  margin: 6% auto;
  width: 90%;
`;

export const TitleGridCSS = styled(Grid)`
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
`;

export const HeaderCSS = styled(Box)`
  color: ${({ theme }) => theme.palette.grey[`B100`]};
  font-size: 1.1rem;
  margin: 0 0 3rem 0;
`;

export const FormLabelCSS = styled(FormLabel)`
  display: block;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.palette.grey['B100']};
  .MuiFormLabel-asterisk {
    color: #FF7B7B;
  }
`;

export const InputLabelCSS = styled(InputLabel)`
  font-size: 0.85rem;
  
  .MuiInputLabel-asterisk {
    color: #FF7B7B;
  }
`;

export const LinkCss = styled(Link)`
  color: ${({ theme }) => theme.link.active};
  font-size: 12px;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  
  &:hover {
    color: ${({ theme }) => theme.link.hover};
  }
`;

export const TitleBlockCSS = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const TitleCSS = styled(Typography)`
  color: #81879F;
  padding: 0 0 1rem 0;
  display: ${({ hidden }) => hidden ? 'none' : 'flex'};;
`;

export const DialogCSS = styled(Dialog)`
  .MuiDialog-paper {
    background: ${({ theme }) => theme.palette.background.body};
  }
`;

export const GridItemCSS = styled(Grid)`
  display: flex;
  background: ${({ opacity }) => opacity ? '#1e2331' : '#212635'};
  
  &:nth-of-type(1) {
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
  }
  
  &:nth-last-of-type(1) {
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
  }
`;
