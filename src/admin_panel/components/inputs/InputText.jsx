import { Controller } from 'react-hook-form';
import { IconButton, InputAdornment, styled, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const InputText = ({
                     control,
                     type,
                     name,
                     errors,
                     require,
                     isIconEye,
                     disabled,
                     sx,
                     showPassword,
                     setShowPassword,
                     placeholder,
                   }) => {
  const showAdornment = (IconEye, setShowPsw, showPsw) => {
    return IconEye ? {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            edge="end"
            onMouseDown={event => event.preventDefault()}
            onClick={() => setShowPsw(!showPsw)}>
            {showPsw ? <VisibilityOff/> : <Visibility/>}
          </IconButton>
        </InputAdornment>
      )
    } : {};
  };
  
  const changeType = (name, showPsw = 'true') => {
    if (name === 'email') return 'email';
    return showPsw ? "text" : "password";
  };
  
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) =>
        <TextFieldCSS
          {...field}
          fullWidth
          sx={sx}
          size="small"
          variant="outlined"
          disabled={disabled}
          required={require}
          placeholder={placeholder}
          type={type || changeType(name, showPassword)}
          error={!!errors[name]}
          helperText={errors[name] ? errors[name].message : ''}
          InputProps={showAdornment(isIconEye, setShowPassword, showPassword)}
        />
      }
    />
  );
};

export const TextFieldCSS = styled(TextField)`
  .MuiInputBase-root {
    border: 1px solid ${({ theme }) => theme.palette.grey[`400`]};
    color: ${({ theme }) => theme.palette.grey[`900`]};
  }
`;
