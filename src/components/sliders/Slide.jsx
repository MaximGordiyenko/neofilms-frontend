import { Controller } from 'react-hook-form';
import { Slider } from '@mui/material';

export const Slide = ({ name, control }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={5} // Set initial value here
      render={({ field }) => (
        <Slider
          {...field}
          min={0}
          step={1}
          max={100}
          getAriaValueText={(value) => `${value}`}
          valueLabelFormat={(value) => `${value}`}
          valueLabelDisplay="auto"
          aria-labelledby="non-linear-slider"
        />
      )}
    />
  );
};
