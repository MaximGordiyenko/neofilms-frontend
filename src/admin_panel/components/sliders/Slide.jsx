import { Controller } from 'react-hook-form';
import { Slider } from '@mui/material';

export const Slide = ({ name, value, control }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <Slider
          {...field}
          min={0}
          step={1}
          max={100}
          value={field.value || value}
          onChange={(e, newValue) => field.onChange(newValue)}
          getAriaValueText={(value) => `${value}`}
          valueLabelFormat={(value) => `${value}`}
          valueLabelDisplay="auto"
          aria-labelledby="non-linear-slider"
        />
      )}
    />
  );
};
