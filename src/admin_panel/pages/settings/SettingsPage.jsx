import { AdminTabPanel } from '../../components/tabs/AdminTabPanel';
import { ContainerCSS } from '../../components/ui/ui.styles';
import { Grid, Typography, Button } from '@mui/material';
import { InputTextAutosize } from '../../components/inputs/InputTextAutosize';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateField } from '../../store/reducers/calendar.reducer';
import { toast } from 'react-toastify';
import { TaskAlt } from '@mui/icons-material';
import { adminUpdatePassword } from '../../store/thunk/admin.api';
import { yupResolver } from '@hookform/resolvers/yup';
import { checkPassword } from '../../validation/admin';

export const SettingsPage = ({ tab }) => {
  const dispatch = useDispatch();
  
  const methods = useForm({
    mode: 'isOnAll',
    resolver: yupResolver(checkPassword),
  });
  
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = methods;

  const onInputChange = (field, value) => dispatch(updateField({ field, value }));
  
  const onSubmit = (data) => {
    dispatch(adminUpdatePassword(data.new_password));
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
                      onInputChange={(value) => onInputChange('current_password', value)}
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
                      onInputChange={(value) => onInputChange('new_password', value)}
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
                      onInputChange={(value) => onInputChange('confirm_password', value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: 20 }}>
                  <Button variant="contained" color="primary" fullWidth endIcon={<TaskAlt/>} type="submit">
                    Save
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
