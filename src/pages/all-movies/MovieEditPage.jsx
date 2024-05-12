import { ContainerCSS } from '../../components/ui/ui.styles.js';
import { Grid, Typography, Button, Box } from '@mui/material';
import { BreadCrumbs } from '../../components/ui/Breadcrumbs.jsx';
import { ROUTE } from '../../constants.js';
import { Delete, DownloadDone } from '@mui/icons-material';
import { FileUploader } from '../../components/file-upload/FileUploader.jsx';
import { InputTextAutosize } from '../../components/inputs/InputTextAutosize.jsx';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateField } from '../../store/reducers/movie.reducer.js';
import { DataPicker } from '../../components/pickers/DataPicker.jsx';
import { RadioButton } from '../../components/radio/RadioButton.jsx';
import { useState, useEffect } from 'react';
import { IconButton } from '../../components/buttons/IconButton.jsx';
import { useParams } from 'react-router-dom';
import { getMovie } from '../../store/apis/movie.api.js';

export const MovieEditPage = () => {
  const dispatch = useDispatch();
  const { movieId } = useParams();
  
  useEffect(() => {
    dispatch(getMovie(movieId));
  }, [dispatch]);
  
  const {
    title,
    description,
    movie_link,
    release_date,
    status,
    directed_by,
    written_by,
    starring
  } = useSelector((state) => state?.movie?.movie);
  
  const [directors, setDirectors] = useState(directed_by || []);
  const [written, setWritten] = useState(written_by || []);
  const [actors, setActors] = useState(starring || []);
  
  const onDirectorChange = (index, value) => {
    const updatedDirectors = [...directors];
    updatedDirectors[index] = value;
    setDirectors(updatedDirectors);
  };
  
  const onWrittenChange = (index, value) => {
    const updatedDirectors = [...written];
    updatedDirectors[index] = value;
    setWritten(updatedDirectors);
  };
  
  const onActorsChange = (index, value) => {
    const updatedDirectors = [...actors];
    updatedDirectors[index] = value;
    setActors(updatedDirectors);
  };
  
  const onInputChange = (field, value) => dispatch(updateField({ field, value }));
  
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
    console.log(data);
  };
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ContainerCSS sx={{ background: 'none' }}>
          <Grid container>
            <Grid item xs={12} sm={6} md={12} lg={12}>
              <BreadCrumbs currentPage={`${ROUTE.admin}/${ROUTE.allMovies}`}/>
            </Grid>
            <Grid item xs={12} sm={6} md={9} lg={9.5}>
              <Typography variant="h5">New Movie</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={9} lg={2.5} display="flex" justifyContent="space-between">
              <Button variant="contained" color="error" endIcon={<Delete/>} onClick={() => {
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
              <Grid item xs={12} sm={12} md={12} lg={12} sx={{ background: 'white', my: 20, p: 30 }}>
                <Typography variant="h5">Movie Poster</Typography>
                <FileUploader name="movie" multiple={false} onInputChange={onInputChange}/>
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
                    value={title}
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
                    value={description}
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
                    value={movie_link}
                    control={control}
                    errors={errors}
                    onInputChange={(value) => onInputChange('button_link', value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ my: 20 }}>
                  <DataPicker
                    name="release_date"
                    value={release_date}
                    control={control}
                    errors={errors}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ my: 20 }}>
                  <RadioButton
                    control={control}
                    errors={errors}
                    value={status}
                    name="status"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid item xs={12} sm={12} md={12} lg={12} sx={{ background: 'white', ml: 20, mt: 20, p: 30 }}>
                <Typography variant="h5">Directed by</Typography>
                {directors.map((director, index) => (
                  <Box sx={{ p: 15 }} key={index}>
                    <InputTextAutosize
                      name={`director_${index}`}
                      label={`Director's name ${index + 1}`}
                      placeholder="John Doe"
                      control={control}
                      errors={errors}
                      value={director}
                      onInputChange={(value) => onDirectorChange(index, value)}
                    />
                  </Box>
                ))}
                <IconButton onClick={() => setDirectors([...directors, ''])}>Add Director</IconButton>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} sx={{ background: 'white', ml: 20, mt: 20, p: 30 }}>
                <Typography variant="h5">Written by</Typography>
                {written.map((director, index) => (
                  <Box sx={{ p: 15 }} key={index}>
                    <InputTextAutosize
                      name={`written_${index}`}
                      label={`Written's name ${index + 1}`}
                      placeholder="John Doe"
                      control={control}
                      errors={errors}
                      value={written}
                      onInputChange={(value) => onWrittenChange(index, value)}
                    />
                  </Box>
                ))}
                <IconButton onClick={() => setWritten([...written, ''])}>Add Written</IconButton>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} sx={{ background: 'white', ml: 20, mt: 20, p: 30 }}>
                <Typography variant="h5">Starring</Typography>
                {actors.map((director, index) => (
                  <Box sx={{ p: 15 }} key={index}>
                    <InputTextAutosize
                      name={`actor_${index}`}
                      label={`Actor's name ${index + 1}`}
                      placeholder="John Doe"
                      control={control}
                      errors={errors}
                      value={actors}
                      onInputChange={(value) => onActorsChange(index, value)}
                    />
                  </Box>
                ))}
                <IconButton onClick={() => setActors([...actors, ''])}>Add Actor</IconButton>
              </Grid>
            </Grid>
          </Grid>
        </ContainerCSS>
      </form>
    </FormProvider>
  );
};
