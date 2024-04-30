import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import { grey } from '@mui/material/colors';

export const IconButton = ({ children, onClick, icon }) => {
  return (
    <Button
      variant="outlined"
      endIcon={icon ? icon : <Add/>}
      sx={{ border: "none", color: grey[600] }}
      onClick={onClick}>
      {children}
    </Button>
  );
};
