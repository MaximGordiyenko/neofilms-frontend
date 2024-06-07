import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Grid, Typography, Button } from '@mui/material';
import { DownloadDone, Remove } from '@mui/icons-material';

import { useNavigate, useParams } from 'react-router-dom';
import { ROUTE } from '../../../constants';

import { ContainerCSS, GroupGridCSS } from './CreateCastingPage';

import { BreadCrumbs } from '../../components/ui/Breadcrumbs';
import { IconButton } from '../../components/buttons/IconButton';
import { DataPicker } from '../../components/pickers/DataPicker';
import { FileUploader } from '../../components/file-upload/FileUploader';
import { InputTextAutosize } from '../../components/inputs/InputTextAutosize';

import { useDispatch, useSelector } from 'react-redux';
import { updateCasting, getCasting } from '../../store/thunk/casting.api';

export const CastingEditPage = () => {
  const [imageUpload, setImageUpload] = useState([{ name: 'mock.png', size: 0 }]);
  const [roles, setRoles] = useState([
    { id: 1, name: 'test', description: 'hello world' }
  ]);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { castingId } = useParams();
  
  useEffect(() => {
    dispatch(getCasting(castingId));
  }, [dispatch]);
  
  const { title, subtitle, additional_info, plot, producer, director, writer, casting_director,
    audition_dates = {}, callback_dates = {}, shoot_dates = {}, deadline, rate_of_pay_per_day, location,
  } = useSelector((state) => state?.casting?.casting || {});

  const addNewRole = () => {
    setRoles([...roles, { id: roles.length + 1, name: '', description: '' }]);
  };
  
  const methods = useForm({
    mode: 'onSubmit'
    // resolver: yupResolver(AccountSchema),
  });
  
  const { control, handleSubmit, formState: { errors } } = methods;
  
  const onSubmit = (data) => {
    const castingData = {
      image: imageUpload[0],
      title: data.title,
      subtitle: data.subtitle,
      additional_info: data.additional_info,
      plot: data.plot,
      producer: data.producer,
      director: data.director,
      writer: data.writer,
      casting_director: data.casting_director,
      audition_dates: data.audition_dates,
      callback_dates: data.callback_dates,
      shoot_dates: data.shoot_dates,
      deadline: data.deadline,
      rate_of_pay_per_day: data.rate_of_pay_per_day,
      location: data.location,
      roles: data.roles,
    };
    console.log(castingData);
    dispatch(updateCasting({ id: castingId, data: castingData }));
    navigate(`/${ROUTE.admin}/${ROUTE.casting}`);
    toast.success(`"Casting" was updated successfuly`);
  };
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ContainerCSS>
          
          <Grid container>
            <Grid item xs={12} sm={6} md={12} lg={12}>
              <BreadCrumbs currentPage={`${ROUTE.admin}/${ROUTE.casting}`}/>
            </Grid>
            <Grid container item xs={12} sm={6} md={12} lg={12} my={30}>
              <Grid item xs={12} sm={6} md={9} lg={11.1}>
                <Typography variant="h5" color={'primary'}>New Casting</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={9} lg={0.9} display="flex" justifyContent="space-between">
                <Button variant="contained" endIcon={<DownloadDone/>} type="submit">
                  Save
                </Button>
              </Grid>
            </Grid>
          </Grid>
          
          <Grid container justifyContent="space-between">
            <Grid container item xs={12} lg={5.8} sx={{ height: '100%' }}>
              <Grid container item xs={12} lg={12} sx={{ background: 'white', p: 30, mb: 30 }}>
                <Grid item xs={12} sm={12} md={12} lg={12} pb={15}>
                  <Typography variant="h5" color={'primary'}>Main Image</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <FileUploader
                    name="image"
                    multiple={false}
                    fileUpload={imageUpload}
                    setFileUpload={setImageUpload}
                  />
                </Grid>
              </Grid>
              <Grid container item xs={12} lg={12} sx={{ background: 'white', p: 30 }}>
                <Grid item xs={12} sm={12} md={12} lg={12} pb={15}>
                  <Typography variant="h5" color={'primary'}>Movie Details</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <InputTextAutosize
                    name="title"
                    label="Title"
                    placeholder="The maestro"
                    control={control}
                    errors={errors}
                    value={title}
                    onInputChange={(value) => onInputChange('title', value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <InputTextAutosize
                    name="subtitle"
                    label="Subtitle"
                    placeholder="Write something..."
                    value={subtitle}
                    control={control}
                    errors={errors}
                    isText={true}
                    minRows={1000}
                    maxRows={1000}
                    onInputChange={(value) => onInputChange('subtitle', value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <InputTextAutosize
                    name="additional_info"
                    label="Additional Info"
                    placeholder="Write something..."
                    value={additional_info}
                    control={control}
                    errors={errors}
                    isText={true}
                    minRows={1000}
                    maxRows={1000}
                    onInputChange={(value) => onInputChange('additional_info', value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <InputTextAutosize
                    name="plot"
                    label="Plot"
                    placeholder="Write something..."
                    value={plot}
                    control={control}
                    errors={errors}
                    isText={true}
                    minRows={1000}
                    maxRows={1000}
                    onInputChange={(value) => onInputChange('plot', value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <InputTextAutosize
                    name="producer"
                    label="Producer"
                    placeholder="Full Name"
                    value={producer}
                    control={control}
                    errors={errors}
                    onInputChange={(value) => onInputChange('producer', value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <InputTextAutosize
                    name="director"
                    label="Director"
                    placeholder="Full Name"
                    value={director}
                    control={control}
                    errors={errors}
                    onInputChange={(value) => onInputChange('director', value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <InputTextAutosize
                    name="writer"
                    label="Writer"
                    placeholder="Full Name"
                    value={writer}
                    control={control}
                    errors={errors}
                    onInputChange={(value) => onInputChange('writer', value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <InputTextAutosize
                    name="casting_director"
                    label="Casting Director"
                    placeholder="Full Name"
                    value={casting_director}
                    control={control}
                    errors={errors}
                    onInputChange={(value) => onInputChange('casting_director', value)}
                  />
                </Grid>
                <GroupGridCSS item container xs={12} sm={12} md={12} lg={12}>
                  <Grid item xs={12} sm={12} md={5} lg={5.5}>
                    <DataPicker
                      name="audition_dates.from"
                      label="MM/DD/YYYY"
                      value={audition_dates.from}
                      control={control}
                      errors={errors}
                    />
                  </Grid>
                  <Remove/>
                  <Grid item xs={12} sm={12} md={5} lg={5.5}>
                    <DataPicker
                      name="audition_dates.to"
                      label="MM/DD/YYYY"
                      value={audition_dates.to}
                      control={control}
                      errors={errors}
                    />
                  </Grid>
                </GroupGridCSS>
                <GroupGridCSS item container xs={12} sm={12} md={12} lg={12}>
                  <Grid item xs={12} sm={12} md={12} lg={5.5}>
                    <DataPicker
                      name="callback_dates.from"
                      label="MM/DD/YYYY"
                      value={callback_dates.from}
                      control={control}
                      errors={errors}
                    />
                  </Grid>
                  <Remove/>
                  <Grid item xs={12} sm={12} md={12} lg={5.5}>
                    <DataPicker
                      name="callback_dates.to"
                      label="MM/DD/YYYY"
                      value={callback_dates.to}
                      control={control}
                      errors={errors}
                    />
                  </Grid>
                </GroupGridCSS>
                <GroupGridCSS item container xs={12} sm={12} md={12} lg={12}>
                  <Grid item xs={12} sm={12} md={12} lg={5.5}>
                    <DataPicker
                      name="shoot_dates.from"
                      label="MM/DD/YYYY"
                      value={shoot_dates.from}
                      control={control}
                      errors={errors}
                    />
                  </Grid>
                  <Remove/>
                  <Grid item xs={12} sm={12} md={12} lg={5.5}>
                    <DataPicker
                      name="shoot_dates.to"
                      label="MM/DD/YYYY"
                      value={shoot_dates.to}
                      control={control}
                      errors={errors}
                    />
                  </Grid>
                </GroupGridCSS>
                <Grid item xs={12} sm={12} md={12} lg={12} pb={20}>
                  <DataPicker
                    name="deadline"
                    label="MM/DD/YYYY"
                    value={deadline}
                    control={control}
                    errors={errors}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <InputTextAutosize
                    name="rate_of_pay_per_day"
                    label="Rate of pay per day"
                    placeholder="$0"
                    value={rate_of_pay_per_day}
                    control={control}
                    errors={errors}
                    onInputChange={(value) => onInputChange('rate_of_pay_per_day', value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <InputTextAutosize
                    name="location"
                    label="Location"
                    placeholder="LA, CA"
                    value={location}
                    control={control}
                    errors={errors}
                    onInputChange={(value) => onInputChange('location', value)}
                  />
                </Grid>
              </Grid>
            </Grid>
            
            <Grid container item xs={12} lg={5.8} sx={{ background: 'white', height: '100%', p: 30 }}>
              <Grid item xs={12} sm={12} md={12} lg={12} pb={15}>
                <Typography variant="h5" color={'primary'}>Role</Typography>
              </Grid>
              {roles.map((role, index) => (
                <Grid container xs={12} sm={12} md={12} lg={12} item key={role.id}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <InputTextAutosize
                      name={`roles[${index}].name`}
                      label={`Character Name ${role.id}`}
                      placeholder="The maestro"
                      value={`${roles[index].name}`}
                      control={control}
                      errors={errors}
                      onInputChange={(value) => onInputChange(`name_${role.id}`, value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <InputTextAutosize
                      name={`roles[${index}].description`}
                      label={`Character Description ${role.id}`}
                      placeholder="Write something..."
                      value={`${roles[index].description}`}
                      control={control}
                      errors={errors}
                      isText={true}
                      minRows={1000}
                      maxRows={1000}
                      onInputChange={(value) => onInputChange(`description_${role.id}`, value)}
                    />
                  </Grid>
                </Grid>
              ))}
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <IconButton onClick={addNewRole}>Add Role</IconButton>
              </Grid>
            </Grid>
          </Grid>
        </ContainerCSS>
      </form>
    </FormProvider>
  );
};
