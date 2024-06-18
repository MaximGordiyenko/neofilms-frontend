import { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { ContainerCSS } from '../../components/ui/ui.styles.js';
import { BreadCrumbs } from '../../components/ui/Breadcrumbs.jsx';
import { IconButton } from '../../components/buttons/IconButton.jsx';
import { DataPicker } from '../../components/pickers/DataPicker.jsx';
import { RadioButton } from '../../components/radio/RadioButton.jsx';
import { InputTextAutosize } from '../../components/inputs/InputTextAutosize.jsx';
import { FileUploader } from '../../components/file-upload/FileUploader';

import { Grid, Typography, Button, Box } from '@mui/material';
import { Delete, DownloadDone } from '@mui/icons-material';

import { useParams, useNavigate } from 'react-router-dom';
import { ROUTE } from '../../../constants.js';

import { useDispatch, useSelector } from 'react-redux';
import { getMovie, updateMovie, deleteMovie } from '../../store/thunk/movie.api.js';
import { updateField } from '../../store/reducers/movie.reducer.js';

export const MovieEditPage = () => {
  const [posterUpload, setPosterUpload] = useState([{ name: 'mock.png', size: 0 }]);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { movieId } = useParams();
  console.log(movieId);
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
  const [writers, setWriters] = useState(written_by || []);
  const [actors, setActors] = useState(starring || []);
  
  const onDirectorChange = (index, value) => {
    const updatedDirectors = [...directors];
    updatedDirectors[index] = value;
    setDirectors(updatedDirectors);
  };
  
  const onWrittenChange = (index, value) => {
    const updatedWrites = [...writers];
    updatedWrites[index] = value;
    setWriters(updatedWrites);
  };
  
  const onActorsChange = (index, value) => {
    const updatedActors = [...actors];
    updatedActors[index] = value;
    setActors(updatedActors);
  };
  
  const onInputChange = (field, value) => dispatch(updateField({ field, value }));
  
  const methods = useForm({
    mode: 'onSubmit'
    // resolver: yupResolver(AccountSchema),
  });
  
  const { control, handleSubmit, formState: { errors } } = methods;
  
  const onSubmit = (data) => {
    const movieDate = {
      poster: posterUpload[0],
      title: data.title || title,
      description: data.description || description,
      movie_link: data.movie_link || movie_link,
      release_date: data?.release_date.unix() * 1000 || release_date.unix() * 1000,
      status: data.status || status,
      directed_by: directors,
      written_by: writers,
      starring: actors,
    };
    dispatch(updateMovie({ id: movieId, data: movieDate }));
    navigate(`/${ROUTE.admin}/${ROUTE.allMovies}`);
    toast.success(`"Movie" was added successfuly`);
  };
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ContainerCSS sx={{ background: 'none' }}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <BreadCrumbs currentPage={`${ROUTE.admin}/${ROUTE.allMovies}`}/>
            </Grid>
            <Grid item xs={4} sm={9} md={9} lg={9.5}>
              <Typography variant="h5" color="primary">New Movie</Typography>
            </Grid>
            <Grid item xs={4} sm={3} md={9} lg={2.5} display="flex" justifyContent="space-between">
              <Button variant="contained" color="error" endIcon={<Delete/>} onClick={() => {
                dispatch(deleteMovie(movieId));
                navigate(`/${ROUTE.admin}/${ROUTE.allMovies}`);
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
                <Typography variant="h5" color="primary">Movie Poster</Typography>
                <FileUploader
                  name="poster"
                  multiple={false}
                  fileUpload={posterUpload}
                  setFileUpload={setPosterUpload}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} sx={{ background: 'white', p: 30 }}>
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ my: 20 }}>
                  <Typography variant="h5" color="primary">Movie Information</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ my: 20 }}>
                  <InputTextAutosize
                    name="title"
                    label="Title"
                    placeholder="The maestro"
                    value={title}
                    control={control}
                    errors={errors}
                    onInputChange={(value) => onInputChange('title', value)}
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
                    onInputChange={(value) => onInputChange('description', value)}
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
                    onInputChange={(value) => onInputChange('movie_link', value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ my: 20 }}>
                  <DataPicker
                    name="release_date"
                    label="Release date"
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
                <Typography variant="h5" color="primary">Directed by</Typography>
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
                <Typography variant="h5" color="primary">Written by</Typography>
                {writers.map((writer, index) => (
                  <Box sx={{ p: 15 }} key={index}>
                    <InputTextAutosize
                      name={`written_${index}`}
                      label={`Written's name ${index + 1}`}
                      placeholder="John Doe"
                      control={control}
                      errors={errors}
                      value={writer}
                      onInputChange={(value) => onWrittenChange(index, value)}
                    />
                  </Box>
                ))}
                <IconButton onClick={() => setWriters([...writers, ''])}>Add Written</IconButton>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} sx={{ background: 'white', ml: 20, mt: 20, p: 30 }}>
                <Typography variant="h5">Starring</Typography>
                {actors.map((actor, index) => (
                  <Box sx={{ p: 15 }} key={index}>
                    <InputTextAutosize
                      name={`actor_${index}`}
                      label={`Actor's name ${index + 1}`}
                      placeholder="John Doe"
                      control={control}
                      errors={errors}
                      value={actor}
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
