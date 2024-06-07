import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { FormProvider, useForm } from 'react-hook-form';

import { Grid, Typography, Button } from '@mui/material';
import { DownloadDone } from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../../constants.js';

import { Slide } from '../../components/sliders/Slide.jsx';
import { ContainerCSS } from '../../components/ui/ui.styles.js';
import { BreadCrumbs } from '../../components/ui/Breadcrumbs.jsx';
import { InputTextAutosize } from '../../components/inputs/InputTextAutosize.jsx';
import { FileUploader } from '../../components/file-upload/FileUploader';

import { useDispatch } from 'react-redux';
import { addProject } from '../../store/thunk/project.api.js';
import { updateField } from '../../store/reducers/project.reducer.js';

export const CreateProjectPage = () => {
  const [imageUpload, setImageUpload] = useState([]);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const methods = useForm({
    mode: 'onSubmit'
    // resolver: yupResolver(AccountSchema),
  });
  
  const { watch, control, handleSubmit, formState: { errors} } = methods;
  
  const onInputChange = (field, value) => dispatch(updateField({ field, value }));
  
  const onSubmit = (data) => {
    console.log(data);
    const newProject = {
      id: uuidv4(),
      ...data,
      image: imageUpload[0],
    }
    dispatch(addProject(newProject));
    navigate(`/${ROUTE.admin}/${ROUTE.web3project}`);
    toast.success(`${data.logo_text} was added successfuly`);
  };
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ContainerCSS sx={{ background: 'none' }}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <BreadCrumbs currentPage={`${ROUTE.admin}/${ROUTE.web3project}`}/>
            </Grid>
            <Grid item xs={12} sm={4} md={9} lg={11.1}>
              <Typography variant="h5" color="primary">New Project</Typography>
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
                <Typography variant="h6">Project Image</Typography>
                {/*<FileUploader name="image" multiple={false} onInputChange={onInputChange}/>*/}
                <FileUploader
                  name="image"
                  multiple={false}
                  fileUpload={imageUpload}
                  setFileUpload={setImageUpload}
                />
              </Grid>
            </Grid>
            <Grid item xs={5.9}>
              <Grid item xs={12} sm={4} md={9} lg={12} sx={{ background: 'white', ml: 20, mt: 20, p: 30 }}>
                <Typography variant="h6">Project Details</Typography>
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ my: 20 }}>
                  <InputTextAutosize
                    name="name"
                    label="Project name"
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
                  <Slide
                    name="completion"
                    control={control}
                    errors={errors}
                  />
                  <Typography variant="caption">{watch('completion') || 5}%</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </ContainerCSS>
      </form>
    </FormProvider>
  );
};
