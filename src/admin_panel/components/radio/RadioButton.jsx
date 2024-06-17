import { useState } from 'react';
import { Radio, FormControlLabel, FormControl, RadioGroup, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import { grey } from '@mui/material/colors';

export const RadioButton = ({ control, name }) => {
  const [value, setValue] = useState("coming_soon");
  
  return (
    <FormControl>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <RadioGroup
            row={true}
            aria-labelledby="demo-controlled-radio-buttons-group"
            value={value}
            onChange={({ target: { value } }) => {
              field.onChange(value);
              setValue(value);
            }}>
            <FormControlLabel
              value="coming_soon"
              label={
                <Typography sx={{ color: grey[700] }}>
                  To be announced
                </Typography>
              }
              control={
                <Radio sx={{ color: grey[500] }} size="small" />
              }
            />
            <FormControlLabel
              value="to_be_announced"
              control={
                <Radio sx={{ color: grey[500] }} size="small" />
              }
              label={
                <Typography sx={{ color: grey[700] }}>
                  To be announced
                </Typography>
              }
            />
          </RadioGroup>
        )}
      />
    </FormControl>
  );
};
