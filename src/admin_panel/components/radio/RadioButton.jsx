import { useState, useEffect } from 'react';
import { Radio, FormControlLabel, FormControl, RadioGroup, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import { grey } from '@mui/material/colors';

export const RadioButton = ({ control, name, value = '' }) => {
  const [data, setData] = useState(value);
  
  useEffect(() => {
    setData(value);
  }, [value]);
  
  return (
    <FormControl>
      <Controller
        name={name}
        control={control}
        defaultValue={data}
        render={({ field }) => (
          <RadioGroup
            row={true}
            aria-labelledby="demo-controlled-radio-buttons-group"
            value={data}
            onChange={({ target: { value } }) => {
              field.onChange(value);
              setData(value);
            }}>
            <FormControlLabel
              value="coming_soon"
              label={
                <Typography sx={{ color: grey[700] }}>
                  Coming soon
                </Typography>
              }
              control={
                <Radio sx={{ color: grey[500] }} size="small"/>
              }
            />
            <FormControlLabel
              value="to_be_announced"
              control={
                <Radio sx={{ color: grey[500] }} size="small"/>
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
