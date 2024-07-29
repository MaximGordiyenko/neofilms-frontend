import { AdminTabPanel } from '../../components/tabs/AdminTabPanel';
import { ContainerCSS } from '../../components/ui/ui.styles';
import { Grid, Typography, Button } from '@mui/material';
import { InputTextAutosize } from '../../components/inputs/InputTextAutosize';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateField } from '../../store/reducers/calendar.reducer';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { TaskAlt, DownloadDone } from '@mui/icons-material';
import { deleteMovie } from '../../store/thunk/movie.api';
import { ROUTE } from '../../../constants';

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
    const newPassword= {
      id: uuidv4(),
      ...data
    };
    // dispatch(updatePassword(newPassword));
    toast.success(`Password was updated successfuly`);
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
                    <Typography variant="h5">Change Password</Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} sx={{ my: 20 }}>
                    <InputTextAutosize
                      name="current_password"
                      label="Current Password"
                      required={true}
                      placeholder="Enter Current Admin Password"
                      control={control}
                      errors={errors}
                      onInputChange={(value) => onInputChange('logo_text', value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: 20 }}>
                    <InputTextAutosize
                      name="new_password"
                      label="New Password"
                      required={true}
                      placeholder="Enter New Admin Password"
                      control={control}
                      errors={errors}
                      onInputChange={(value) => onInputChange('logo_text', value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: 20 }}>
                    <InputTextAutosize
                      name="confirm_password"
                      label="Repeat New Password"
                      required={true}
                      placeholder="Confirm New Admin Password"
                      control={control}
                      errors={errors}
                      onInputChange={(value) => onInputChange('logo_text', value)}
                    />
                  </Grid><Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: 20 }}>
                  <Button variant="contained" color="primary" fullWidth endIcon={<TaskAlt/>} onClick={() => {
                    // dispatch(deleteMovie(movieId));
                    // navigate(`/${ROUTE.admin}/${ROUTE.allMovies}`);
                    // toast.error(`Movie "${title}" was delete successfuly`);
                  }}>
                    Delete
                  </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </ContainerCSS>
        </form>
      </FormProvider>
    </AdminTabPanel>
  );
};
