import { useState } from 'react';
import { Radio, FormControlLabel, FormControl, RadioGroup } from '@mui/material';
import { Controller } from 'react-hook-form';

export const RadioButton = ({ control, name }) => {
  const [value, setValue] = useState("coming");
  
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
              value="coming"
              label="Comming soon"
              control={
                <Radio color="secondary" size="small" />
              }
            />
            <FormControlLabel
              value="announced"
              label="To be announced"
              control={
                <Radio color="secondary" size="small" />
              }
            />
          </RadioGroup>
        )}
      />
    </FormControl>
  );
};
