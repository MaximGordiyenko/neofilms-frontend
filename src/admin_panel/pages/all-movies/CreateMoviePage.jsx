import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { FormProvider, useForm } from 'react-hook-form';

import { Grid, Typography, Button, Box } from '@mui/material';
import { DownloadDone } from '@mui/icons-material';

import { ContainerCSS } from '../../components/ui/ui.styles.js';
import { BreadCrumbs } from '../../components/ui/Breadcrumbs.jsx';
import { DataPicker } from '../../components/pickers/DataPicker.jsx';
import { RadioButton } from '../../components/radio/RadioButton.jsx';
import { IconButton } from '../../components/buttons/IconButton.jsx';
import { FileUploader } from '../../components/file-upload/FileUploader.jsx';
import { InputTextAutosize } from '../../components/inputs/InputTextAutosize.jsx';

import { useDispatch } from 'react-redux';
import { addMovie } from '../../store/thunk/movie.api.js';
import { updateField } from '../../store/reducers/movie.reducer.js';

import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../../constants.js';
import { SimpleFileUploader } from '../../components/file-upload/SimpleFileUploader';

export const CreateMoviePage = () => {
  const [posterUpload, setPosterUpload] = useState([]);
  const [addDirector, setAddDirector] = useState(1);
  const [addWritten, setAddWritten] = useState(1);
  const [addActor, setAddActor] = useState(1);
  
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
  
  const onSubmit = (data) => {
    const directed_by = [];
    const written_by = [];
    const starring = [];
    
    for (const key in data) {
      if (key.includes("directed_by")) {
        directed_by.push(data[key]);
      }
      if (key.includes("written_by")) {
        written_by.push(data[key]);
      }
      if (key.includes("starring")) {
        starring.push(data[key]);
      }
    }
    
    const movieData = {
      id: uuidv4(),
      poster: posterUpload,
      title: data.title,
      description: data.description,
      movie_link: data.movie_link,
      release_date: data?.release_date.unix() * 1000,
      status: data.status,
      directed_by: directed_by,
      written_by: written_by,
      starring: starring,
    };
    console.log(movieData);
    dispatch(addMovie(movieData));
    navigate(`/${ROUTE.admin}/${ROUTE.allMovies}`);
    toast.success(`${data.logo_text} was added successfuly`);
  };
  
  const onInputChange = (field, value) => dispatch(updateField({ field, value }));
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ContainerCSS sx={{ background: 'none' }}>
          <Grid container>
            <Grid item xs={12} sm={6} md={12} lg={12}>
              <BreadCrumbs currentPage={`${ROUTE.admin}/${ROUTE.allMovies}`}/>
            </Grid>
            <Grid item xs={12} sm={6} md={9} lg={11.1}>
              <Typography variant="h5">New Movie</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={9} lg={0.9} display="flex" justifyContent="space-between">
              <Button variant="contained" endIcon={<DownloadDone/>} type="submit">
                Save
              </Button>
            </Grid>
          </Grid>
          <Grid container justifyContent="space-around">
            <Grid item xs={6}>
              <Grid item xs={12} sm={12} md={12} lg={12} sx={{ background: 'white', my: 20, p: 30 }}>
                <Typography variant="h5">Movie Poster</Typography>
                <SimpleFileUploader
                  name="poster"
                  multiple={false}
                  fileUpload={posterUpload}
                  setFileUpload={setPosterUpload}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} sx={{ background: 'white', p: 30 }}>
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ my: 20 }}>
                  <Typography variant="h5">Movie Information</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ my: 20 }}>
                  <InputTextAutosize
                    name="title"
                    label="Title"
                    placeholder="The maestro"
                    control={control}
                    errors={errors}
                    onInputChange={(value) => onInputChange('logo_text', value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ my: 20 }}>
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
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ my: 20 }}>
                  <InputTextAutosize
                    name="movie_link"
                    label="IMDB Link"
                    placeholder="https://..."
                    control={control}
                    errors={errors}
                    onInputChange={(value) => onInputChange('button_link', value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ my: 20 }}>
                  <DataPicker
                    name="release_date"
                    control={control}
                    errors={errors}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ my: 20 }}>
                  <RadioButton
                    name="status"
                    control={control}
                    errors={errors}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid item xs={12} sm={12} md={12} lg={12} sx={{ background: 'white', ml: 20, mt: 20, p: 30 }}>
                <Typography variant="h5">Directed by</Typography>
                {[...Array(addDirector)].map((_, index) => (
                  <Box sx={{ p: 15 }} key={index}>
                    <InputTextAutosize
                      name={`directed_by_${index}`}
                      label={`Director's name ${index + 1}`}
                      placeholder="John Doe"
                      control={control}
                      errors={errors}
                    />
                  </Box>
                ))}
                <IconButton onClick={() => setAddDirector(addDirector + 1)}>Add Director</IconButton>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} sx={{ background: 'white', ml: 20, mt: 20, p: 30 }}>
                <Typography variant="h5">Written by</Typography>
                {[...Array(addWritten)].map((_, index) => (
                  <Box sx={{ p: 15 }} key={index}>
                    <InputTextAutosize
                      name={`written_by_${index}`}
                      label={`Written's name ${index + 1}`}
                      placeholder="John Doe"
                      control={control}
                      errors={errors}
                    />
                  </Box>
                ))}
                <IconButton onClick={() => setAddWritten(addWritten + 1)}>Add Written</IconButton>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} sx={{ background: 'white', ml: 20, mt: 20, p: 30 }}>
                <Typography variant="h5">Starring</Typography>
                {[...Array(addActor)].map((_, index) => (
                  <Box sx={{ p: 15 }} key={index}>
                    <InputTextAutosize
                      name={`starring_${index}`}
                      label={`Actor's name ${index + 1}`}
                      placeholder="John Doe"
                      control={control}
                      errors={errors}
                    />
                  </Box>
                ))}
                <IconButton onClick={() => setAddActor(addActor + 1)}>Add Actor</IconButton>
              </Grid>
            </Grid>
          </Grid>
        </ContainerCSS>
      </form>
    </FormProvider>
  );
};
