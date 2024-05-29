import { styled, TextField } from "@mui/material";

export const TextFieldCSS = styled(TextField)(
  ({ theme }) => ({
    paddingBottom: "20px",
    "& .MuiInputBase-root.Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline": {
        border: `1px solid ${theme.palette.grey[400]}`
      }
    },
    "& .MuiFormHelperText-root": {
      color: "blue",
      "& .error-chars": {
        color: "red"
      }
    },
    "& .MuiInputBase-input": {
      fontSize: "1.3em"
    },
    "& textarea": {
      minHeight: "100px"
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: `${theme.palette.grey[600]}`,
      fontSize: "0.87rem"
    }
  })
);
