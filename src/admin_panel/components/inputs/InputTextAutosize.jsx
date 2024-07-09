import { Controller } from 'react-hook-form';
import { TextFieldCSS } from './ui.styles';
import { useState, useEffect } from "react";


export const InputTextAutosize = ({
                                    name, value = "", label, control, errors, sx,
                                    isText = false, minRow, maxRow, placeholder, onInputChange, maxChars
                                  }) => {
  const [inputText, setInputText] = useState(value);

  useEffect(() => {
    setInputText(value);
  }, [value]);
  
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={inputText}
      render={
        ({ field }) =>
          <TextFieldCSS
            {...field}
            value={inputText}
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
              setInputText(e.target.value);
              if (onInputChange) {
                onInputChange(e.target.value);
              }
            }}
          />
      }
    />
  );
};
