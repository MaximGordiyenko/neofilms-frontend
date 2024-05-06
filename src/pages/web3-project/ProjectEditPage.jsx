import { Grid, Typography, Button } from '@mui/material';
import { BreadCrumbs } from '../../components/ui/Breadcrumbs.jsx';
import { ROUTE } from '../../constants.js';
import { Delete, DownloadDone } from '@mui/icons-material';
import { FileUploader } from '../../components/file-upload/FileUploader.jsx';
import { FormProvider, useForm } from 'react-hook-form';
import { ContainerCSS } from '../../components/ui/ui.styles.js';
import { useDispatch } from 'react-redux';
import { updateField } from '../../store/sliderPageSlice.js';
import { InputTextAutosize } from '../../components/inputs/InputTextAutosize.jsx';
import { Slide } from '../../components/sliders/Slide.jsx';

export const ProjectEditPage = () => {
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
  
  const onInputChange = (field, value) => dispatch(updateField({ field, value }));
  
  const onSubmit = (data) => {
    console.log(data); // Handle form data submission
  };
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ContainerCSS sx={{ background: 'none' }}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <BreadCrumbs currentPage={`${ROUTE.admin}/${ROUTE.web3project}`}/>
            </Grid>
            <Grid item xs={12} sm={4} md={9} lg={9.5}>
              <Typography variant="h5">New Project</Typography>
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
                <Typography variant="h6">Project Image</Typography>
                <FileUploader name="movie" multiple={false} onInputChange={onInputChange}/>
              </Grid>
            </Grid>
            <Grid item xs={5.9}>
              <Grid item xs={12} sm={4} md={9} lg={12} sx={{ background: 'white', ml: 20, mt: 20, p: 30 }}>
                <Typography variant="h6">Project Details</Typography>
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ my: 20 }}>
                  <InputTextAutosize
                    name="movie"
                    label="Title"
                    placeholder="The maestro"
                    control={control}
                    errors={errors}
                    onInputChange={(value) => onInputChange('logo_text', value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ my: 20 }}>
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
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ my: 20 }}>
                  <Slide
                    name="completion"
                    control={control}
                    errors={errors}
                  />
                  <Typography variant="caption">{watch('completion')}%</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </ContainerCSS>
      </form>
    </FormProvider>
  );
};
