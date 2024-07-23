import { Controller } from 'react-hook-form';
import { FormControlLabel, Checkbox, styled } from '@mui/material';

export const NeoCheckbox = ({ name, value, label, control, setCheckedData }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={value}
      render={({ field }) => (
        <FormControlLabelCSS
          label={label}
          control={
            <CheckboxCSS
              {...field}
              checked={value}
              onChange={(e) => {
                setCheckedData(e.target.checked);
                // field.onChange(e.target.checked);
              }}
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
