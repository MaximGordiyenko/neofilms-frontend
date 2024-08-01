import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { FormProvider, useForm } from 'react-hook-form';

import { Grid, Typography, Button, styled, Container } from '@mui/material';
import { DownloadDone, Remove } from '@mui/icons-material';

import { BreadCrumbs } from '../../components/ui/Breadcrumbs';
import { NeoCheckbox } from '../../components/checkbox/NeoCheckbox';
import { DataPicker } from '../../components/pickers/DataPicker';
import { IconButton } from '../../components/buttons/IconButton.jsx';
import { InputTextAutosize } from '../../components/inputs/InputTextAutosize';

import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../../constants';

import { useDispatch } from 'react-redux';
import { updateField } from '../../store/reducers/project.reducer';
import { addCasting } from '../../store/thunk/casting.api';
import { FileUploader } from '../../components/file-upload/FileUploader';

export const CreateCastingPage = () => {
  const [imageUpload, setImageUpload] = useState([]);
  const [checkedData, setCheckedData] = useState(null);
  const [roles, setRoles] = useState([
    { id: 1, name: 'test', description: 'hello world' }
  ]);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const methods = useForm({
    mode: 'onSubmit'
    // resolver: yupResolver(AccountSchema),
  });
  
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = methods;
  
  const addNewRole = () => {
    setRoles([...roles, { id: roles.length + 1, name: '', description: '' }]);
  };
  
  const onInputChange = (field, value) => dispatch(updateField({ field, value }));
  
  const onSubmit = (data) => {
    const newCasting = {
      id: uuidv4(),
      ...data,
      image: imageUpload[0],
      audition_dates: {
        from: data.audition_dates.from.unix() * 1000,
        to: data.audition_dates.to.unix() * 1000
      },
      eco_cast_self_tape: data.eco_cast_self_tape || checkedData,
      callback_dates: {
        from: data.callback_dates.from.unix() * 1000,
        to: data.callback_dates.to.unix() * 1000
      },
      shoot_dates: {
        from: data.shoot_dates.from.unix() * 1000,
        to: data.shoot_dates.to.unix() * 1000
      },
      deadline: data.deadline.unix() * 1000,
      rate_of_pay_per_day: Number(data.rate_of_pay_per_day)
    };
    dispatch(addCasting(newCasting));
    navigate(`/${ROUTE.admin}/${ROUTE.casting}`);
    toast.success(`Casting "${data.logo_text}" was added successfuly`);
  };
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ContainerCSS>
          
          <Grid container>
            <Grid item xs={12} sm={6} md={12} lg={12}>
              <BreadCrumbs currentPage={`${ROUTE.admin}/${ROUTE.casting}`}/>
            </Grid>
            <Grid container item xs={12} sm={6} md={12} lg={12} my={10}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography variant="h5" color={'primary'}>New Casting</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} display="flex" justifyContent="flex-end">
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
                    onInputChange={(value) => onInputChange('title', value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <InputTextAutosize
                    name="subtitle"
                    label="Subtitle"
                    placeholder="Write something..."
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
                    control={control}
                    errors={errors}
                    onInputChange={(value) => onInputChange('casting_director', value)}
                  />
                </Grid>
                <GroupGridCSS item container xs={12} sm={12} md={12} lg={12}>
                  <Grid item xs={12} sm={12} md={5} lg={5.5}>
                    <DataPicker
                      name="audition_dates.from"
                      label="Audition dates"
                      control={control}
                      errors={errors}
                    />
                  </Grid>
                  <Remove/>
                  <Grid item xs={12} sm={12} md={5} lg={5.5}>
                    <DataPicker
                      name="audition_dates.to"
                      label="Audition dates"
                      palceholder="MM/DD/YYYY"
                      control={control}
                      errors={errors}
                    />
                  </Grid>
                </GroupGridCSS>
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
                      control={control}
                      errors={errors}
                    />
                  </Grid>
                  <Remove/>
                  <Grid item xs={12} sm={12} md={12} lg={5.5}>
                    <DataPicker
                      name="callback_dates.to"
                      label="Callback dates"
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
                      control={control}
                      errors={errors}
                    />
                  </Grid>
                  <Remove/>
                  <Grid item xs={12} sm={12} md={12} lg={5.5}>
                    <DataPicker
                      name="shoot_dates.to"
                      label="Shoot dates"
                      control={control}
                      errors={errors}
                    />
                  </Grid>
                </GroupGridCSS>
                <Grid item xs={12} sm={12} md={12} lg={12} pb={20}>
                  <DataPicker
                    name="deadline"
                    label="Deadline"
                    control={control}
                    errors={errors}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <InputTextAutosize
                    name="rate_of_pay_per_day"
                    label="Rate of pay per day"
                    placeholder="$0"
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

export const ContainerCSS = styled(Container)(
  ({ theme }) => ({
    margin: '200px auto',
    position: 'relative'
  })
);

export const GroupGridCSS = styled(Grid)(
  ({ theme }) => ({
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20
  })
);
