import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FormProvider, useForm } from 'react-hook-form';

import { Grid, Typography, Button } from '@mui/material';
import { Delete, DownloadDone } from '@mui/icons-material';

import { Slide } from '../../components/sliders/Slide.jsx';
import { ContainerCSS } from '../../components/ui/ui.styles.js';
import { BreadCrumbs } from '../../components/ui/Breadcrumbs.jsx';
import { InputTextAutosize } from '../../components/inputs/InputTextAutosize.jsx';
import { FileUploader } from '../../components/file-upload/FileUploader';

import { useDispatch, useSelector } from 'react-redux';
import { updateField } from '../../store/reducers/project.reducer.js';
import { getProject, deleteProject, updateProject } from '../../store/thunk/project.api.js';

import { useParams, useNavigate } from 'react-router-dom';
import { ROUTE } from '../../../constants.js';

export const ProjectEditPage = () => {
  const [imageUpload, setImageUpload] = useState([{ name: 'mock.png', size: 0 }]);
  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    completion: 0,
  });
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projectId } = useParams();
  
  useEffect(() => {
    dispatch(getProject(projectId)).then((project) => {
      const { name, description, completion } = project.payload;
      setProjectData({ name, description, completion });
    });
  }, [dispatch, projectId]);
  
  useEffect(() => {
    dispatch(getProject(projectId));
  }, [dispatch, projectId]);

  const { name, description, completion } = useSelector((state) => state?.project?.project);
  
  const methods = useForm({
    mode: 'onSubmit',
    defaultValues: projectData,
  });
  
  const { control, handleSubmit, formState: { errors } } = methods;
  
  const onInputChange = (field, value) => {
    setProjectData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    dispatch(updateField({ field, value }));
  };
  
  const onSubmit = (data) => {
    const updatedProjectData = {
      image: imageUpload[0],
      name: data.name || projectData.name,
      description: data.description || projectData.description,
      completion: data.completion || projectData.completion
    };
    dispatch(updateProject({ id: projectId, data: updatedProjectData }));
    navigate(`/${ROUTE.admin}/${ROUTE.web3project}`);
    toast.success(`Project "${updatedProjectData.name}" was updated successfully`);
  };
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ContainerCSS sx={{ background: 'none' }}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <BreadCrumbs currentPage={`${ROUTE.admin}/${ROUTE.web3project}`}/>
            </Grid>
            <Grid item xs={4} sm={9} md={9} lg={9.5}>
              <Typography variant="h5" color="primary">New Project</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={2.5} display="flex" justifyContent="flex-end">
              <Button variant="contained" color="error" endIcon={<Delete/>} onClick={() => {
                dispatch(deleteProject(projectId));
                navigate(`/${ROUTE.admin}/${ROUTE.web3project}`);
                toast.error(`Project "${name}" was delete successfuly`);
              }}>
                Delete
              </Button>
              <Button variant="contained" endIcon={<DownloadDone/>} type="submit" sx={{ ml: 20 }}>
                Save
              </Button>
            </Grid>
          </Grid>
          <Grid container justifyContent="space-around">
            <Grid item xs={6}>
              <Grid item xs={12} sm={12} md={12} lg={12} sx={{ background: 'white', my: 20, p: 30 }}>
                <Typography variant="h6">Project Image</Typography>
                <FileUploader
                  name="image"
                  multiple={false}
                  fileUpload={imageUpload}
                  setFileUpload={setImageUpload}
                />
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid item xs={12} sm={12} md={12} lg={12} sx={{ background: 'white', ml: 20, mt: 20, p: 30 }}>
                <Typography variant="h6">Project Details</Typography>
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ my: 20 }}>
                  <InputTextAutosize
                    name="name"
                    label="Project name"
                    placeholder="The maestro"
                    value={name}
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
                    maxChars={300}
                    onInputChange={(value) => onInputChange('additional_text', value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ my: 20 }}>
                  <Slide
                    name="completion"
                    value={completion}
                    control={control}
                    errors={errors}
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
