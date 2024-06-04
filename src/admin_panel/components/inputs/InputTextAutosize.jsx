import { Controller } from 'react-hook-form';
import { TextFieldCSS } from './ui.styles';

export const InputTextAutosize = ({
                                    name, value, label, control, errors, sx,
                                    isText = false, minRow, maxRow, placeholder, onInputChange, maxChars
                                  }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={value || ""}
      render={
        ({ field }) =>
          <TextFieldCSS
            {...field}
            value={field.value}
            placeholder={placeholder}
            sx={sx}
            multiline={isText}
            maxRows={maxRow}
            minRows={minRow}
            label={label}
            fullWidth
            focused
            error={!!errors[name]}
            onBlur={field.onBlur}
            helperText={
              errors[name]
                ? errors[name].message
                : maxChars ? `${field.value.length}/${maxChars} characters` : ''
            }
            InputProps={{
              className: field.value.length >= maxChars ? "error-chars" : ""
            }}
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
