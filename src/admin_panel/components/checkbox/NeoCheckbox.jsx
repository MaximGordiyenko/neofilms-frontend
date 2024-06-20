import { FormControlLabel, Checkbox, styled } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';

export const NeoCheckbox = ({ name, value = false, label, control }) => {
  const [data, setData] = useState(value);
  
  useEffect(() => {
    setData(value);
  }, [value]);
  
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={data}
      render={({ field }) => (
        <FormControlLabelCSS
          label={label}
          control={
            <CheckboxCSS
              {...field}
              value={data}
              checked={field.value}
            />
          }
        />
      )}
    />
  );
};

const FormControlLabelCSS = styled(FormControlLabel)(
  ({ theme }) => ({
    '& .MuiFormControlLabel-label': {
      color: theme.palette.grey[600]
    }
  })
);

export const CheckboxCSS = styled(Checkbox)(
  ({ theme }) => ({
    color: theme.palette.grey[600]
  })
);
