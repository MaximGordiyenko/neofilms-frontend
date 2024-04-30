import { useState } from 'react';
import { Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { styled } from '@mui/material';

export const DataPicker = ({ control }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name="selectedDate"
        control={control}
        defaultValue={selectedDate}
        render={({ field }) => (
          <StyledDatePicker
            {...field}
            label="Basic date picker"
            value={field.value}
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
  width: '100%',
});
