import { useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import { styled, Box, Toolbar, IconButton } from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

export const DataPicker = ({ name, value, label, control }) => {
  const initialDate = value ? dayjs(value) : dayjs('MM/DD/YYYY');
  const [selectedDate, setSelectedDate] = useState(initialDate);
  
  useEffect(() => {
    setSelectedDate(value ? dayjs(value) : dayjs('MM/DD/YYYY'));
  }, [value]);
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name || "some_date"}
        control={control}
        defaultValue={selectedDate}
        render={({ field }) => (
          <DatePickerCSS
            {...field}
            label={label}
            reduceAnimations={true}
            value={selectedDate}
            onChange={(date) => {
              field.onChange(date);
              setSelectedDate(date);
            }}
            slots={{
              layout: MyCustomLayout,
              toolbar: CustomToolbar,
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};


export const DatePickerCSS = styled(DatePicker)(
  ({ theme }) => ({
    width: '100%',
    "& .MuiInputBase-root": {
      color: theme.palette.grey[800],
      "& .MuiOutlinedInput-notchedOutline": {
        border: `1px solid ${theme.palette.grey[400]}`
      },
      "& .MuiOutlinedInput-root.Mui-error ": {
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
      background: 'white',
      padding: 2,
      fontSize: "0.87rem"
    },
    // Add styles for weeks
    "& .MuiDayCalendar-header": {
      color: `${theme.palette.primary.main}`, // Change color for day elements
      "& .MuiTypography-root": {
        color: `${theme.palette.secondary.main}`, // Change color for week container
      },
    },
  })
);

const MyCustomLayout = ({ children }) => (
  <Box sx={{ backgroundColor: 'white' }}>
    {children}
  </Box>
);

const CustomToolbar = () => (
  <Toolbar sx={{ justifyContent: 'space-between', backgroundColor: 'white' }}>
    <IconButton sx={{ color: 'black' }}>
      <ArrowBack />
    </IconButton>
    <IconButton sx={{ color: 'black' }}>
      <ArrowForward />
    </IconButton>
  </Toolbar>
);
