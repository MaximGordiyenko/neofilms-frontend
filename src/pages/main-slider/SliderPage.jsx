import { useForm, FormProvider } from 'react-hook-form';

import { Grid, Button, Typography } from '@mui/material';
import { Delete, DownloadDone } from '@mui/icons-material';

import { ContainerCSS } from '../../components/ui/ui.styles.js';
import { InputTextAutosize } from '../../components/inputs/InputTextAutosize.jsx';
import { BreadCrumbs } from '../../components/ui/Breadcrumbs.jsx';
import { DropzoneField } from '../../components/file-upload/DropZoneUpload.jsx';

import { useDispatch } from 'react-redux';
import { updateField } from '../../store/sliderPageSlice.jsx';
import { ROUTE } from '../../constants.js';

export const SliderPage = () => {
  const dispatch = useDispatch();
  
  const methods = useForm({
    mode: 'onSubmit',
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
    console.log(data); // Handle form data submission
  };
  console.log(watch());
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ContainerCSS sx={{ background: 'none' }}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <BreadCrumbs currentPage={`${ROUTE.admin}/${ROUTE.mainSlider}`} />
            </Grid>
            <Grid item xs={12} sm={4} md={9} lg={9.5}>
              <Typography variant="h5">New Slide</Typography>
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
          <Grid container>
            <Grid item xs={5.9}>
              <Grid item xs={12} sm={4} md={9} lg={12} sx={{ background: 'white', mb: 20, mt: 20, p: 30 }}>
                <Typography variant="h6">Main Image or Video</Typography>
                <DropzoneField name="movie" multiple={false} onInputChange={onInputChange} />
              </Grid>
              <Grid item xs={12} sm={4} md={9} lg={12} sx={{ background: 'white', p: 30 }}>
                <Typography variant="h6">Movie Title (Logo)</Typography>
                <DropzoneField name="logo_media" multiple={false} onInputChange={onInputChange} />
              </Grid>
            </Grid>
            <Grid item xs={5.9} sx={{ background: 'white', ml: 20, mt: 20 }}>
              <Grid item xs={12} sm={12} md={12} lg={12} sx={{ my: 20, px: 30 }}>
                <Typography variant="h6">Additional Data</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} sx={{ my: 20, px: 30 }}>
                <InputTextAutosize
                  name="logo_text"
                  label="Movie logo (title) alt text"
                  placeholder="The maestro"
                  control={control}
                  errors={errors}
                  onInputChange={(value) => onInputChange('logo_text', value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} sx={{ my: 20, px: 30 }}>
                <InputTextAutosize
                  name="additional_text"
                  label="Additional text"
                  placeholder="The maestro"
                  control={control}
                  errors={errors}
                  isText={true}
                  minRows={1000}
                  maxRows={1000}
                  onInputChange={(value) => onInputChange('additional_text', value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} sx={{ my: 20, px: 30 }}>
                <InputTextAutosize
                  name="button_text"
                  label="Button text"
                  placeholder="The maestro"
                  control={control}
                  errors={errors}
                  onInputChange={(value) => onInputChange('button_text', value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} sx={{ my: 20, px: 30 }}>
                <InputTextAutosize
                  name="button_link"
                  label="Button link"
                  placeholder="https://..."
                  control={control}
                  errors={errors}
                  onInputChange={(value) => onInputChange('button_link', value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </ContainerCSS>
      </form>
    </FormProvider>
  );
};
