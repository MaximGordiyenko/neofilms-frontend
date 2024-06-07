import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FormProvider, useForm } from 'react-hook-form';

import { Grid, Typography, Button } from '@mui/material';
import { DownloadDone } from '@mui/icons-material';

import { ContainerCSS } from '../../components/ui/ui.styles.js';
import { BreadCrumbs } from '../../components/ui/Breadcrumbs.jsx';
import { InputTextAutosize } from '../../components/inputs/InputTextAutosize.jsx';

import { ROUTE } from '../../../constants.js';

import { useDispatch } from 'react-redux';
import { addSlide } from '../../store/thunk/slide.api.js';
import { updateField } from '../../store/reducers/slide.reducer.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FileUploader } from '../../components/file-upload/FileUploader';

export const CreateSlidePage = () => {
  const [movieUpload, setMovieUpload] = useState([]);
  const [logoUpload, setLogoUpload] = useState([]);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const methods = useForm({
    mode: 'onSubmit'
    // resolver: yupResolver(AccountSchema),
  });
  
  const { control, handleSubmit, formState: { errors } } = methods;
  
  const onInputChange = (field, value) => dispatch(updateField({ field, value }));
  
  const onSubmit = (data) => {
    const slideData = {
      id: uuidv4(),
      ...data,
      movie: movieUpload[0],
      logo_media: logoUpload[0]
    };
    dispatch(addSlide(slideData));
    navigate(`/${ROUTE.admin}/${ROUTE.mainSlider}`);
    toast.success(`${data.logo_text} was added successfuly`);
  };
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ContainerCSS sx={{ background: 'none' }} step={7}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <BreadCrumbs currentPage={`${ROUTE.admin}/${ROUTE.mainSlider}`}/>
            </Grid>
            <Grid item xs={12} sm={4} md={9} lg={11.1}>
              <Typography variant="h5" color="primary">New Slide</Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={9} lg={0.9} display="flex" justifyContent="space-between">
              <Button variant="contained" endIcon={<DownloadDone/>} type="submit">
                Save
              </Button>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={5.9}>
              <Grid item xs={12} sm={4} md={9} lg={12} sx={{ background: 'white', mb: 20, mt: 20, p: 30 }}>
                <Typography variant="h6">Main Image or Video</Typography>
                <FileUploader
                  name="movie"
                  multiple={false}
                  fileUpload={movieUpload}
                  setFileUpload={setMovieUpload}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={9} lg={12} sx={{ background: 'white', p: 30 }}>
                <Typography variant="h6">Movie Title (Logo)</Typography>
                <FileUploader
                  name="logo_media"
                  multiple={false}
                  fileUpload={logoUpload}
                  setFileUpload={setLogoUpload}
                />
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
