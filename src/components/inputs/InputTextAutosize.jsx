import { TextField, styled } from '@mui/material';
import { Controller } from 'react-hook-form';

export const InputTextAutosize = ({name, label, control, errors, sx, isText = false, minRow, maxRow, placeholder, onInputChange}) => {

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=''
      render={
        ({ field }) =>
          <TextFieldCSS
            {...field}
            value={field.value || ''}
            placeholder={placeholder}
            sx={sx}
            multiline={isText}
            maxRows={maxRow}
            minRows={minRow}
            label={label}
            fullWidth
            focused
            error={!!errors[name]}
            helperText={errors[name] ? errors[name].message : ''}
            onBlur={field.onBlur}
            onChange={(e) => {
              field.onChange(e);
              if (onInputChange) {
                onInputChange(e.target.value);
              }
            }}
          />
      }
    />
  );
};


const TextFieldCSS = styled(TextField)`
  .MuiInputBase-root.Mui-focused {
    .MuiOutlinedInput-notchedOutline {
      border: 1px solid ${({ theme }) => theme.palette.grey[`400`]};
    }
    
    .MuiInputBase-input {
      font-size: 1.3em
    }
    
    textarea {
      min-height: 100px
    }
  }
  
  .MuiFormLabel-root.Mui-focused {
    color: ${({ theme }) => theme.palette.grey[`600`]};
    font-size: 0.87rem
  }
`;
