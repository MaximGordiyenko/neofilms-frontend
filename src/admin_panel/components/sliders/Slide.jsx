import { Controller } from 'react-hook-form';
import { Slider, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

export const Slide = ({ name, value = 0, control }) => {
  const [data, setData] = useState(value);
  
  useEffect(() => {
    setData(value);
  }, [value]);

  return (
    <>
      <Typography variant="h6">Completion</Typography>
      <Controller
        name={name}
        control={control}
        defaultValue={data}
        render={({ field }) => (
          <Slider
            {...field}
            min={0}
            step={1}
            max={100}
            value={data}
            onChange={(e, newValue) => {
              field.onChange(newValue);
              setData(newValue);
            }}
            getAriaValueText={(value) => `${value}`}
            valueLabelFormat={(value) => `${value}`}
            valueLabelDisplay="auto"
            aria-labelledby="non-linear-slider"
          />
        )}
      />
      <Typography variant="caption">{data}%</Typography>
    </>
  );
};
