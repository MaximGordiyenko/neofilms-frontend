import { AdminTabPanel } from '../../components/tabs/AdminTabPanel';
import { ContainerCSS } from '../../components/ui/ui.styles';
import { Grid, Typography } from '@mui/material';
import { InputTextAutosize } from '../../components/inputs/InputTextAutosize';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateField } from '../../store/reducers/calendar.reducer';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

export const SettingsPage = ({ tab }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const methods = useForm({
    mode: 'onSubmit'
    // resolver: yupResolver(AccountSchema),
  });
  
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = methods;
  
  const onInputChange = (field, value) => dispatch(updateField({ field, value }));
  
  const onSubmit = (data) => {
    const newEventData = {
      id: uuidv4(),
      ...data
    };
    // dispatch(addCalendar(newEventData));
    toast.success(`Event "${data.name}" was added successfuly`);
  };
  
  return (
    <AdminTabPanel value={tab} index={5}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ContainerCSS sx={{ background: 'none' }}>
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
                    <InputTextAutosize
                      name="name"
                      label="Event name"
                      placeholder="Name..."
                      control={control}
                      errors={errors}
                      onInputChange={(value) => onInputChange('logo_text', value)}
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
                    maxChars={100}
                    onInputChange={(value) => onInputChange('additional_text', value)}
                  />
                </Grid>
              </Grid>
            </Grid>
          </ContainerCSS>
        </form>
      </FormProvider>
    </AdminTabPanel>
  );
};
