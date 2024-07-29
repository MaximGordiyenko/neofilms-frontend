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
              toolbar: CustomToolbar
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
    '& .MuiInputBase-root-MuiOutlinedInput-root.Mui-error.MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.grey[400]
    },
    "& .MuiInputBase-root": {
      color: theme.palette.grey[800],
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.grey[400]
      },
      "& .MuiOutlinedInput-root.Mui-error ": {
        borderColor: theme.palette.grey[400]
      }
    },
    "& .MuiFormHelperText-root": {
      color: "blue",
    },
    "& .MuiInputBase-input": {
      fontSize: "1.3em",
      color: theme.palette.grey[800]
    },
    "& textarea": {
      minHeight: "100px"
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: theme.palette.grey[600],
      fontSize: "0.87rem"
    },
    "& .MuiFormLabel-root": {
      color: theme.palette.grey[600],
      background: 'white',
      padding: 2,
      fontSize: "0.87rem"
    }
  })
);

const MyCustomLayout = ({ children }) => (
  <BoxCSS className="bla-bla" sx={{ backgroundColor: 'white' }}>
    {children}
  </BoxCSS>
);

const CustomToolbar = () => (
  <Toolbar sx={{ justifyContent: 'space-between' }}>
    <IconButton sx={{ color: 'black' }}>
      <ArrowBack/>
    </IconButton>
    <IconButton sx={{ color: 'black' }}>
      <ArrowForward/>
    </IconButton>
  </Toolbar>
);


export const BoxCSS = styled(Box)(
  ({ theme }) => ({
    "& .MuiDateCalendar-root": {
      "& div": {
        "& .MuiDayCalendar-root": {
          "& .MuiDayCalendar-header": {
            "& .MuiTypography-root": {
              color: 'black'
            }
          }
        }
      }
    }
  })
);
