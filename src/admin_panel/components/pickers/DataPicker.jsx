import { useState } from 'react';
import { Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import { styled, TextField } from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';

export const DataPicker = ({ name, value, label, control }) => {
  const [selectedDate, setSelectedDate] = useState(value ? dayjs(value) : null);
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name || "release_date"}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <StyledDatePicker
            {...field}
            label={label}
            value={field.value || selectedDate}
            onChange={(date) => {
              field.onChange(date);
              setSelectedDate(date);
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

const StyledDatePicker = styled(DatePicker)({
  width: '100%'
});
