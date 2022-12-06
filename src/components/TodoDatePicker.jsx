import * as React from 'react';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/ru';
import dayjs from 'dayjs';

export default function BasicDatePicker({ expDate, setExpDate }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
      <DatePicker
        label="Дата завершения"
        value={expDate}
        onChange={(newValue) => {
          setExpDate(newValue.format());
        }}
        renderInput={(params) => (
          <TextField {...params}
          />
        )}
      />
    </LocalizationProvider>
  );
}
