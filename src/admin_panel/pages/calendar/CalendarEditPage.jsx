import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';

import { Grid, Typography, Button } from '@mui/material';
import { Delete, DownloadDone } from '@mui/icons-material';

import { useParams, useNavigate } from 'react-router-dom';
import { ROUTE } from '../../../constants.js';

import { BreadCrumbs } from '../../components/ui/Breadcrumbs.jsx';
import { ContainerCSS } from '../../components/ui/ui.styles.js';
import { DataPicker } from '../../components/pickers/DataPicker.jsx';
import { InputTextAutosize } from '../../components/inputs/InputTextAutosize.jsx';

import { updateField } from '../../store/reducers/calendar.reducer.js';
import { getCalendar, deleteCalendar, updateCalendar } from '../../store/thunk/calendar.api.js';
import { toast } from 'react-toastify';
import moment from 'moment/moment';

export const CalendarEditPage = () => {
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    date: null,
  });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { calendarId } = useParams();
  
  useEffect(() => {
    dispatch(getCalendar(calendarId)).then((event) => {
      const { name, description, date } = event.payload;
      setEventData({ name, description, date: date ? moment(date) : null });
    });
  }, [dispatch, calendarId]);
  
  useEffect(() => {
    dispatch(getCalendar(calendarId));
  }, [dispatch, calendarId]);
  
  const methods = useForm({
    mode: 'onSubmit'
  });
  
  const { control, handleSubmit, formState: { errors } } = methods;
  
  const onInputChange = (field, value) => {
    setEventData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    dispatch(updateField({ field, value }));
  };
  
  const onSubmit = (data) => {
    const updatedEventData = {
      name: data.name || eventData.name,
      description: data.description || eventData.description,
      date: data?.date?.unix() * 1000 || eventData.date?.unix() * 1000
    }
    dispatch(updateCalendar({ id: calendarId, data: updatedEventData }));
    navigate(`/${ROUTE.admin}/${ROUTE.calendar}`);
    toast.success(`Event ${updatedEventData.name} was added successfuly`);
  };
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ContainerCSS sx={{ background: 'none' }}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <BreadCrumbs currentPage={`${ROUTE.admin}/${ROUTE.calendar}`}/>
            </Grid>
            <Grid item xs={4} sm={9} md={9} lg={9.5}>
              <Typography variant="h5">New Event</Typography>
            </Grid>
            <Grid item xs={4} sm={3} md={9} lg={2.5} display="flex" justifyContent="space-between">
              <Button variant="contained" color="error" endIcon={<Delete/>} onClick={() => {
                dispatch(deleteCalendar(calendarId));
                navigate(`/${ROUTE.admin}/${ROUTE.calendar}`)
                toast.error(`Event "${eventData.name}" was deleted successfuly`);
              }}>
                Delete
              </Button>
              <Button variant="contained" endIcon={<DownloadDone/>} type="submit">
                Save
              </Button>
            </Grid>
          </Grid>
          <Grid container justifyContent='space-around'>
            <Grid item xs={6}>
              <Grid item xs={12} sm={12} md={12} lg={12} sx={{ background: 'white', mt: 20, p: 30 }}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography variant="h5">Event Details</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ my: 20 }}>
                  <InputTextAutosize
                    name="name"
                    label="Event name"
                    placeholder="Name..."
                    value={eventData.name}
                    control={control}
                    errors={errors}
                    onInputChange={(value) => onInputChange('logo_text', value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: 20 }}>
                  <DataPicker
                    name="date"
                    label="MM/DD/YYYY"
                    value={eventData.date}
                    control={control}
                    errors={errors}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid item xs={12} sm={12} md={12} lg={12} sx={{ background: 'white', ml: 20, mt: 20, p: 30 }}>
                <InputTextAutosize
                  name="description"
                  label="Description"
                  placeholder="Write something..."
                  value={eventData.description}
                  control={control}
                  errors={errors}
                  isText={true}
                  minRows={1000}
                  maxRows={1000}
                  maxChars={300}
                  onInputChange={(value) => onInputChange('additional_text', value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </ContainerCSS>
      </form>
    </FormProvider>
  );
};
