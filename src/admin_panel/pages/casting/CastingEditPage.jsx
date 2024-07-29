import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Grid, Typography, Button } from '@mui/material';
import { DownloadDone, Remove, Delete } from '@mui/icons-material';

import { useNavigate, useParams } from 'react-router-dom';
import { ROUTE } from '../../../constants';

import { ContainerCSS, GroupGridCSS } from './CreateCastingPage';

import { BreadCrumbs } from '../../components/ui/Breadcrumbs';
import { IconButton } from '../../components/buttons/IconButton';
import { DataPicker } from '../../components/pickers/DataPicker';
import { FileUploader } from '../../components/file-upload/FileUploader';
import { InputTextAutosize } from '../../components/inputs/InputTextAutosize';
import { NeoCheckbox } from '../../components/checkbox/NeoCheckbox';

import { useDispatch } from 'react-redux';
import { updateCasting, getCasting, deleteCasting } from '../../store/thunk/casting.api';
import { updateField } from '../../store/reducers/movie.reducer';
import moment from 'moment';

export const CastingEditPage = () => {
  const [imageUpload, setImageUpload] = useState([{ name: 'mock.png', size: 0 }]);
  const [checkedData, setCheckedData] = useState(null);
  const [castingData, setCastingData] = useState({
    title: '',
    subtitle: '',
    additional_info: '',
    plot: '',
    producer: '',
    director: '',
    writer: '',
    casting_director: '',
    audition_dates: {
      from: null,
      to: null
    },
    callback_dates: {
      from: null,
      to: null
    },
    shoot_dates: {
      from: null,
      to: null
    },
    deadline: null,
    rate_of_pay_per_day: '',
    location: '',
    roles: []
  });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { castingId } = useParams();
  
  useEffect(() => {
    dispatch(getCasting(castingId)).then((cast) => {
      const {
        title,
        subtitle,
        additional_info,
        plot,
        producer,
        director,
        writer,
        casting_director,
        audition_dates,
        eco_cast_self_tape,
        callback_dates,
        shoot_dates,
        deadline,
        rate_of_pay_per_day,
        location,
        roles
      } = cast.payload;
      
      setCheckedData(eco_cast_self_tape);
      
      setCastingData({
        title,
        subtitle,
        additional_info,
        plot,
        producer,
        director,
        writer,
        casting_director,
        audition_dates: {
          from: audition_dates.from ? moment(audition_dates.from) : null,
          to: audition_dates.to ? moment(audition_dates.to) : null
        },
        callback_dates: {
          from: callback_dates.from ? moment(callback_dates.from) : null,
          to: callback_dates.to ? moment(callback_dates.to) : null
        },
        shoot_dates: {
          from: shoot_dates.from ? moment(shoot_dates.from) : null,
          to: shoot_dates.to ? moment(shoot_dates.to) : null
        },
        deadline: deadline ? moment(deadline) : null,
        rate_of_pay_per_day,
        location,
        roles
      });
    });
  }, [dispatch, castingId]);
  
  useEffect(() => {
    dispatch(getCasting(castingId));
  }, [dispatch, castingId]);
  
  const addNewRole = () => {
    setCastingData(prevState => ({
      ...prevState,
      roles: [
        ...prevState.roles,
        { id: prevState.roles.length + 1, name: '', description: '' }
      ]
    }));
  };
  
  const methods = useForm({
    mode: 'onSubmit',
    defaultValues: {
      eco_cast_self_tape: checkedData,
      ...castingData
    }
  });
  
  const { control, handleSubmit, formState: { errors } } = methods;
  
  const onInputChange = (field, value) => {
    setCastingData((prevData) => ({
      ...prevData,
      [field]: value
    }));
    dispatch(updateField({ field, value }));
  };
  
  const onSubmit = (data) => {
    const updatedCastingData = {
      image: imageUpload[0],
      title: data.title || castingData.title,
      subtitle: data.subtitle || castingData.subtitle,
      additional_info: data.additional_info || castingData.additional_info,
      plot: data.plot || castingData.plot,
      producer: data.producer || castingData.producer,
      director: data.director || castingData.director,
      writer: data.writer || castingData.writer,
      casting_director: data.casting_director || castingData.casting_director,
      audition_dates: {
        from: (data.audition_dates?.from?.unix() * 1000) || (castingData.audition_dates?.from?.unix() * 1000),
        to: (data.audition_dates?.to?.unix() * 1000) || (castingData.audition_dates?.to?.unix() * 1000)
      },
      callback_dates: {
        from: (data.callback_dates?.from?.unix() * 1000) || (castingData.callback_dates?.from?.unix() * 1000),
        to: (data.callback_dates?.to?.unix() * 1000) || (castingData.callback_dates?.to?.unix() * 1000)
      },
      shoot_dates: {
        from: (data.shoot_dates?.from?.unix() * 1000) || (castingData.shoot_dates?.from?.unix() * 1000),
        to: (data.shoot_dates?.to?.unix() * 1000) || (castingData.shoot_dates?.to?.unix() * 1000)
      },
      deadline: (data?.deadline?.unix() * 1000) || (castingData.deadline?.unix() * 1000),
      rate_of_pay_per_day: data.rate_of_pay_per_day || castingData.rate_of_pay_per_day,
      eco_cast_self_tape: data.eco_cast_self_tape || checkedData,
      location: data.location || castingData.location,
      roles: data.roles && data.roles.length ? data.roles : castingData.roles
    };
    
    dispatch(updateCasting({ id: castingId, data: updatedCastingData }));
    navigate(`/${ROUTE.admin}/${ROUTE.casting}`);
    toast.success(`Casting "${updatedCastingData?.title}" was updated successfully`);
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
              <Grid item xs={12} sm={6} md={9} lg={9.5}>
                <Typography variant="h5" color={'primary'}>New Casting</Typography>
              </Grid>
              
              <Grid item container xs={4} sm={3} md={9} lg={2.5} justifyContent="space-between">
                <Button variant="contained" color="error" endIcon={<Delete/>}
                        onClick={() => {
                          dispatch(deleteCasting(castingId));
                          navigate(`/${ROUTE.admin}/${ROUTE.casting}`);
                          toast.error(`Casting "${title}" was delete successfuly`);
                        }}>
                  Delete
                </Button>
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
                    value={castingData.title}
                    onInputChange={(value) => onInputChange('title', value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <InputTextAutosize
                    name="subtitle"
                    label="Subtitle"
                    placeholder="Write something..."
                    value={castingData.subtitle}
                    control={control}
                    errors={errors}
                    isText={true}
                    minRows={1000}
                    maxRows={1000}
                    maxChars={100}
                    onInputChange={(value) => onInputChange('subtitle', value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <InputTextAutosize
                    name="additional_info"
                    label="Additional Info"
                    placeholder="Write something..."
                    value={castingData.additional_info}
                    control={control}
                    errors={errors}
                    isText={true}
                    minRows={1000}
                    maxRows={1000}
                    maxChars={100}
                    onInputChange={(value) => onInputChange('additional_info', value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <InputTextAutosize
                    name="plot"
                    label="Plot"
                    placeholder="Write something..."
                    value={castingData.plot}
                    control={control}
                    errors={errors}
                    isText={true}
                    minRows={1000}
                    maxRows={1000}
                    maxChars={100}
                    onInputChange={(value) => onInputChange('plot', value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <InputTextAutosize
                    name="producer"
                    label="Producer"
                    placeholder="Full Name"
                    value={castingData.producer}
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
                    value={castingData.director}
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
                    value={castingData.writer}
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
                    value={castingData.casting_director}
                    control={control}
                    errors={errors}
                    onInputChange={(value) => onInputChange('casting_director', value)}
                  />
                </Grid>
                {checkedData &&
                  <GroupGridCSS item container xs={12} sm={12} md={12} lg={12}>
                    <Grid item xs={12} sm={12} md={5} lg={5.5}>
                      <DataPicker
                        name="audition_dates.from"
                        label="Audition dates"
                        value={castingData.audition_dates.from}
                        control={control}
                        errors={errors}
                      />
                    </Grid>
                    <Remove/>
                    <Grid item xs={12} sm={12} md={5} lg={5.5}>
                      <DataPicker
                        name="audition_dates.to"
                        label="Audition dates"
                        value={castingData.audition_dates.to}
                        control={control}
                        errors={errors}
                      />
                    </Grid>
                  </GroupGridCSS>
                }
                <Grid item xs={12} sm={12} md={12} lg={12} mb={15}>
                  <NeoCheckbox
                    name="eco_cast_self_tape"
                    label="Self-Tape"
                    control={control}
                    value={checkedData}
                    setCheckedData={setCheckedData}
                  />
                </Grid>
                <GroupGridCSS item container xs={12} sm={12} md={12} lg={12}>
                  <Grid item xs={12} sm={12} md={12} lg={5.5}>
                    <DataPicker
                      name="callback_dates.from"
                      label="Callback dates"
                      value={castingData.callback_dates.from}
                      control={control}
                      errors={errors}
                    />
                  </Grid>
                  <Remove/>
                  <Grid item xs={12} sm={12} md={12} lg={5.5}>
                    <DataPicker
                      name="callback_dates.to"
                      label="Callback dates"
                      value={castingData.callback_dates.to}
                      control={control}
                      errors={errors}
                    />
                  </Grid>
                </GroupGridCSS>
                <GroupGridCSS item container xs={12} sm={12} md={12} lg={12}>
                  <Grid item xs={12} sm={12} md={12} lg={5.5}>
                    <DataPicker
                      name="shoot_dates.from"
                      label="Shoot dates"
                      value={castingData.shoot_dates.from}
                      control={control}
                      errors={errors}
                    />
                  </Grid>
                  <Remove/>
                  <Grid item xs={12} sm={12} md={12} lg={5.5}>
                    <DataPicker
                      name="shoot_dates.to"
                      label="Shoot dates"
                      value={castingData.shoot_dates.to}
                      control={control}
                      errors={errors}
                    />
                  </Grid>
                </GroupGridCSS>
                <Grid item xs={12} sm={12} md={12} lg={12} pb={20}>
                  <DataPicker
                    name="deadline"
                    label="Deadline"
                    value={castingData.deadline}
                    control={control}
                    errors={errors}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <InputTextAutosize
                    name="rate_of_pay_per_day"
                    label="Rate of pay per day"
                    placeholder="$0"
                    value={castingData.rate_of_pay_per_day}
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
                    value={castingData.location}
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
              {castingData?.roles?.map((role, index) => (
                <Grid container xs={12} sm={12} md={12} lg={12} item key={role.id}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <InputTextAutosize
                      name={`roles[${index}].name`}
                      label={`Character Name ${role.id}`}
                      placeholder="The maestro"
                      value={`${castingData?.roles[index].name}`}
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
                      value={`${castingData?.roles[index].description}`}
                      control={control}
                      errors={errors}
                      isText={true}
                      minRows={1000}
                      maxRows={1000}
                      maxChars={100}
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
