import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { Grid, Button, Typography } from '@mui/material';
import { Delete, DownloadDone } from '@mui/icons-material';

import { ContainerCSS } from '../../components/ui/ui.styles.js';
import { InputTextAutosize } from '../../components/inputs/InputTextAutosize.jsx';
import { BreadCrumbs } from '../../components/ui/Breadcrumbs.jsx';
import { FileUploader } from '../../components/file-upload/FileUploader.jsx';

import { useDispatch, useSelector } from 'react-redux';
import { updateSlide, deleteSlide, getSlide } from '../../store/thunk/slide.api.js';
import { updateField } from '../../store/reducers/slide.reducer.js';

import { useParams, useNavigate } from 'react-router-dom';
import { ROUTE } from '../../../constants.js';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { SimpleFileUploader } from '../../components/file-upload/SimpleFileUploader';

export const SliderEditPage = () => {
  const [movieUpload, setMovieUpload] = useState([]);
  const [logoUpload, setLogoUpload] = useState([]);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { sliderId } = useParams();
  
  useEffect(() => {
    dispatch(getSlide(sliderId));
  }, [dispatch]);
  
  const {
    additional_text,
    button_link,
    button_text,
    logo_media,
    logo_text,
    movie
  } = useSelector((state) => state?.slide?.slide);
  
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
    const slideData = {
      ...data,
      movie: movieUpload[0],
      logo_media: logoUpload[0]
      
    };
    console.log(slideData);
    dispatch(updateSlide({ id: sliderId, slideData }));
    navigate(`/${ROUTE.admin}/${ROUTE.mainSlider}`);
    toast.success(`"Slider" was updated successfuly`);
  };
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ContainerCSS sx={{ background: 'none' }} step={7}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <BreadCrumbs currentPage={`${ROUTE.admin}/${ROUTE.mainSlider}`}/>
            </Grid>
            <Grid item xs={4} sm={9} md={9} lg={9.5}>
              <Typography variant="h5">New Slide</Typography>
            </Grid>
            <Grid item xs={4} sm={3} md={9} lg={2.5} display="flex" justifyContent="space-between">
              <Button variant="contained" color="error" endIcon={<Delete/>} onClick={() => {
                dispatch(deleteSlide(sliderId));
                navigate(`/${ROUTE.admin}/${ROUTE.mainSlider}`);
                toast.success(`"Slide" was deleted successfuly`);
              }}>
                Delete
              </Button>
              <Button variant="contained" endIcon={<DownloadDone/>} type="submit">
                Save
              </Button>
            </Grid>
          </Grid>
          <Grid container justifyContent="space-around">
            <Grid item xs={6}>
              <Grid item xs={12} sm={12} md={12} lg={12} sx={{ background: 'white', mb: 20, mt: 20, p: 30 }}>
                <Typography variant="h6">Main Image or Video</Typography>
                <SimpleFileUploader
                  name="movie"
                  multiple={false}
                  fileUpload={movieUpload}
                  setFileUpload={setMovieUpload}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} sx={{ background: 'white', p: 30 }}>
                <Typography variant="h6">Movie Title (Logo)</Typography>
                <SimpleFileUploader
                  name="logo_media"
                  multiple={false}
                  fileUpload={logoUpload}
                  setFileUpload={setLogoUpload}
                />
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid item xs={12} sm={12} md={12} lg={12} sx={{ background: 'white', ml: 20, mt: 20, p: 30 }}>
                <Typography variant="h6">Additional Data</Typography>
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ my: 20 }}>
                  <InputTextAutosize
                    name="logo_text"
                    label="Movie logo (title) alt text"
                    placeholder="The maestro"
                    value={logo_text}
                    control={control}
                    errors={errors}
                    onInputChange={(value) => onInputChange('logo_text', value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ my: 20 }}>
                  <InputTextAutosize
                    name="additional_text"
                    label="Additional text"
                    placeholder="The maestro"
                    value={additional_text}
                    control={control}
                    errors={errors}
                    isText={true}
                    minRows={1000}
                    maxRows={1000}
                    maxChars={300}
                    onInputChange={(value) => onInputChange('additional_text', value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ my: 20 }}>
                  <InputTextAutosize
                    name="button_text"
                    label="Button text"
                    placeholder="The maestro"
                    value={button_text}
                    control={control}
                    errors={errors}
                    onInputChange={(value) => onInputChange('button_text', value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ my: 20 }}>
                  <InputTextAutosize
                    name="button_link"
                    label="Button link"
                    placeholder="https://..."
                    value={button_link}
                    control={control}
                    errors={errors}
                    onInputChange={(value) => onInputChange('button_link', value)}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </ContainerCSS>
      </form>
    </FormProvider>
  );
};
