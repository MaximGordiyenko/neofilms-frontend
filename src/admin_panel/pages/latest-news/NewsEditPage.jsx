import { ContainerCSS } from '../../components/ui/ui.styles';
import { Grid, Typography, Button } from '@mui/material';
import { BreadCrumbs } from '../../components/ui/Breadcrumbs';
import { ROUTE } from '../../../constants';
import { DownloadDone, Delete } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { FileUploader } from '../../components/file-upload/FileUploader';
import { InputTextAutosize } from '../../components/inputs/InputTextAutosize';
import { FormProvider, useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateField } from '../../store/reducers/project.reducer';
import { DataPicker } from '../../components/pickers/DataPicker';
import { getCurrentNews, updateCurrentNews, deleteNews } from '../../store/thunk/news';
import moment from 'moment/moment';

export const NewsEditPage = () => {
  const [newsData, setNewsData] = useState({
    image_name: [],
    date: null,
    description: '',
  });
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { newsId } = useParams();
  
  useEffect(() => {
    dispatch(getCurrentNews(newsId)).then((news) => {
      const { image_name, date, description } = news.payload;
      setNewsData({ image_name, date: date ? moment(date) : null, description });
    });
  }, [dispatch, newsId]);
  
  useEffect(() => {
    dispatch(getCurrentNews(newsId));
  }, [dispatch, newsId]);
  
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
    const updatedNewsData = {
      ...data,
      image_name: newsData.image_name[0],
      date: data.date?.unix() * 1000 || newsData.date?.unix() * 1000,
      description: data.description || newsData.description,
    };
    dispatch(updateCurrentNews({ id: newsId, data: updatedNewsData }));
    navigate(`/${ROUTE.admin}/${ROUTE.latestNews}`);
    toast.success(`News was updated successfully`);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ContainerCSS sx={{ background: 'none' }}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <BreadCrumbs currentPage={`${ROUTE.admin}/${ROUTE.latestNews}`}/>
            </Grid>
            <Grid item xs={4} sm={9} md={9} lg={9.5}>
              <Typography variant="h5" color="primary">New Story</Typography>
            </Grid>
            <Grid item xs={4} sm={3} md={9} lg={12} display="flex" justifyContent="flex-end">
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
                  name="image_name"
                  multiple={false}
                  fileUpload={newsData}
                  setFileUpload={setNewsData}
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
                    value={newsData.date}
                    control={control}
                    errors={errors}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ my: 20 }}>
                  <InputTextAutosize
                    name="description"
                    label="Description"
                    placeholder="Write something..."
                    value={newsData.description}
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
