import { useDispatch } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';

import { Grid, Typography, Button } from '@mui/material';
import { Delete, DownloadDone } from '@mui/icons-material';

import { ROUTE } from '../../constants.js';

import { BreadCrumbs } from '../../components/ui/Breadcrumbs.jsx';
import { ContainerCSS } from '../../components/ui/ui.styles.js';
import { DataPicker } from '../../components/pickers/DataPicker.jsx';
import { InputTextAutosize } from '../../components/inputs/InputTextAutosize.jsx';

import { updateField } from '../../store/sliderPageSlice.jsx';

export const CalendarEditPage = () => {
  const dispatch = useDispatch();
  
  const methods = useForm({
    mode: 'onSubmit'
    // resolver: yupResolver(AccountSchema),
  });
  
  const {
    watch,
    reset,
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitSuccessful, isValid }
  } = methods;
  
  const onSubmit = (data) => {
    console.log(data); // Handle form data submission
  };
  
  const onInputChange = (field, value) => dispatch(updateField({ field, value }));
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ContainerCSS sx={{ background: 'none' }}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <BreadCrumbs currentPage={`${ROUTE.admin}/${ROUTE.calendar}`}/>
            </Grid>
            <Grid item xs={12} sm={4} md={9} lg={9.5}>
              <Typography variant="h5">New Event</Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={9} lg={2.5} display="flex" justifyContent="space-between">
              <Button variant="contained" color="error" endIcon={<Delete/>} onClick={() => {
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
                    name="calendar_name"
                    label="Event name"
                    placeholder="Name..."
                    control={control}
                    errors={errors}
                    onInputChange={(value) => onInputChange('logo_text', value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: 20 }}>
                  <DataPicker
                    name="calendar_date"
                    label="Event Date"
                    control={control}
                    errors={errors}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid item xs={12} sm={12} md={12} lg={12} sx={{ background: 'white', ml: 20, mt: 20, p: 30 }}>
                <InputTextAutosize
                  name="movie_description"
                  label="Description"
                  placeholder="Write something..."
                  control={control}
                  errors={errors}
                  isText={true}
                  minRows={1000}
                  maxRows={1000}
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
