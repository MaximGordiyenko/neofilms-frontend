import { ContainerCSS } from '../../components/ui/ui.styles';
import { Grid, Typography, Button } from '@mui/material';
import { BreadCrumbs } from '../../components/ui/Breadcrumbs';
import { ROUTE } from '../../../constants';
import { Delete, DownloadDone } from '@mui/icons-material';
import { deleteProject, getProject, updateProject } from '../../store/thunk/project.api';
import { toast } from 'react-toastify';
import { FileUploader } from '../../components/file-upload/FileUploader';
import { InputTextAutosize } from '../../components/inputs/InputTextAutosize';
import { FormProvider, useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateField } from '../../store/reducers/project.reducer';
import { DataPicker } from '../../components/pickers/DataPicker';

export const NewsEditPage = () => {
  const [imageUpload, setImageUpload] = useState([{ name: 'mock.png', size: 0 }]);
  const [newsData, setNewsData] = useState({
    date: '',
    name: '',
  });
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { newsId } = useParams();
  
  useEffect(() => {
    dispatch(getProject(newsId)).then((project) => {
      const { name, description, completion } = project.payload;
      setNewsData({ name, description, completion });
    });
  }, [dispatch, newsId]);
  
  useEffect(() => {
    dispatch(getProject(newsId));
  }, [dispatch, newsId]);
  
  const { name, description } = useSelector((state) => state?.project?.project);
  
  const methods = useForm({
    mode: 'onSubmit',
    defaultValues: newsData,
  });
  
  const { control, handleSubmit, formState: { errors } } = methods;
  
  const onInputChange = (field, value) => {
    setNewsData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    dispatch(updateField({ field, value }));
  };
  
  const onSubmit = (data) => {
    const updatedProjectData = {
      image: imageUpload[0],
      date: data.date || newsData.date,
      description: data.description || newsData.description,
    };
    dispatch(updateProject({ id: newsId, data: updatedProjectData }));
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
              <Typography variant="h5" color="primary">New Story</Typography>
            </Grid>
            <Grid item xs={4} sm={3} md={9} lg={2.5} display="flex" justifyContent="space-between">
              <Button variant="contained" endIcon={<DownloadDone/>} type="submit">
                Save
              </Button>
            </Grid>
          </Grid>
          <Grid container justifyContent="space-around">
            <Grid item xs={6}>
              <Grid item xs={12} sm={12} md={12} lg={12} sx={{ background: 'white', my: 20, p: 30 }}>
                <Typography variant="h6">Cover Image</Typography>
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
                  <DataPicker
                    name="date"
                    label="MM/DD/YYYY"
                    // value={eventData.date}
                    control={control}
                    errors={errors}
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
              </Grid>
            </Grid>
          </Grid>
        </ContainerCSS>
      </form>
    </FormProvider>
  );
};
