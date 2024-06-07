import { useDispatch } from 'react-redux';
import { addCalendar } from '../../store/thunk/calendar.api.js';
import { updateField } from '../../store/reducers/calendar.reducer.js';

import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';

import { ContainerCSS } from '../../components/ui/ui.styles.js';
import { BreadCrumbs } from '../../components/ui/Breadcrumbs.jsx';
import { DataPicker } from '../../components/pickers/DataPicker.jsx';
import { InputTextAutosize } from '../../components/inputs/InputTextAutosize.jsx';

import { Grid, Typography, Button } from '@mui/material';
import { DownloadDone } from '@mui/icons-material';

import { ROUTE } from '../../../constants.js';

export const CreateCalendarPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
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
  
  const onInputChange = (field, value) => dispatch(updateField({ field, value }));
  
  const onSubmit = (data) => {
    const newEventData = {
      id: uuidv4(),
      ...data
    };
    
    dispatch(addCalendar(newEventData));
    navigate(`/${ROUTE.admin}/${ROUTE.calendar}`);
    toast.success(`"Event" was added successfuly`);
  };
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ContainerCSS sx={{ background: 'none' }}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <BreadCrumbs currentPage={`${ROUTE.admin}/${ROUTE.calendar}`}/>
            </Grid>
            <Grid item xs={9} sm={10} md={11} lg={11.1}>
              <Typography variant="h5" color="primary">New Event</Typography>
            </Grid>
            <Grid item xs={3} sm={2} md={1} lg={0.9} display="flex" justifyContent="space-between">
              <Button variant="contained" endIcon={<DownloadDone/>} type="submit">
                Save
              </Button>
            </Grid>
          </Grid>
          <Grid container justifyContent="space-around">
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
                    control={control}
                    errors={errors}
                    onInputChange={(value) => onInputChange('logo_text', value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: 20 }}>
                  <DataPicker
                    name="date"
                    label="MM/DD/YYYY"
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
