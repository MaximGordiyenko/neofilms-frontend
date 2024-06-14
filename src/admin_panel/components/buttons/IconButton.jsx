import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';

export const IconButton = ({ children, onClick, variant, icon }) => {
  return (
    <Button
      variant={variant ? variant : "contained"}
      endIcon={icon ? icon : <Add/>}
      sx={{ border: "none" }}
      onClick={onClick}>
      {children}
    </Button>
  );
};
