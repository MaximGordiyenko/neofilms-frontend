import { useState } from 'react';
import { Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import { styled } from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';

export const DataPicker = ({ name, value, label, control }) => {
  const initialDate = value ? dayjs(value) : null;
  const [selectedDate, setSelectedDate] = useState(initialDate);
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name || "some_date"}
        control={control}
        defaultValue={0}
        render={({ field }) => (
          <StyledDatePicker
            {...field}
            label={label}
            autoFocus={true}
            reduceAnimations={true}
            value={field.value || selectedDate}
            onChange={(date) => {
              field.onChange(date);
              setSelectedDate(date);
            }}
          />
        )}
        slotProps={{
          textField: {
            InputLabelProps: {
              shrink: false
            }
          }
        }}
      />
    </LocalizationProvider>
  );
};


export const StyledDatePicker = styled(DatePicker)(
  ({ theme }) => ({
    width: '100%',
    "& .MuiInputBase-root.Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline": {
        border: `1px solid ${theme.palette.grey[400]}`
      }
    },
    "& .MuiFormHelperText-root": {
      color: "blue",
      "& .error-chars": {
        color: "red"
      }
    },
    "& .MuiInputBase-input": {
      fontSize: "1.3em"
    },
    "& textarea": {
      minHeight: "100px"
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: `${theme.palette.grey[600]}`,
      fontSize: "0.87rem"
    },
    "& .MuiFormLabel-root": {
      color: `${theme.palette.grey[600]}`,
      background:'white',
      padding: 2,
      fontSize: "0.87rem"
    }
  })
);
