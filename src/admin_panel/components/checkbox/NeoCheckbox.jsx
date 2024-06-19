import { FormControlLabel, Checkbox, styled } from '@mui/material';
import { Controller } from 'react-hook-form';

export const NeoCheckbox = ({ name, value, label, control }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={false}
      render={({ field }) => (
        <FormControlLabelCSS
          label={label}
          control={
            <CheckboxCSS
              {...field}
              value={field.value || value}
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
      color: theme.palette.grey[600],
    },
  })
);

export const CheckboxCSS = styled(Checkbox)(
  ({ theme }) => ({
    color: theme.palette.grey[600],
  })
);
