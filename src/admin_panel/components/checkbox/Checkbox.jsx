import { FormControlLabel } from '@mui/material';
import { Controller } from 'react-hook-form';

export const Checkbox = ({ name, label, control }) => {
  return (
    <FormControlLabel
      label={"Ok"}
      control={
        <Controller
          name="check"
          control={control}
          defaultValue={true}
          value={false}
          render={({ field }) => <Checkbox {...field} defaultChecked />}
        />
      }
    />
  );
};
