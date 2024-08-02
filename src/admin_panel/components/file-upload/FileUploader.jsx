import { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { styled, Typography, Link, Grid, IconButton } from '@mui/material';
import { UploadFile, Delete, CheckCircle } from '@mui/icons-material';
import { blue, grey, green } from '@mui/material/colors';

export const FileUploader = ({ name, multiple, fileUpload, setFileUpload }) => {
  const { acceptedFiles, getRootProps, getInputProps, isFocused, isDragAccept, isDragReject, open } = useDropzone({
    accept: {
      'image/png': ['.png', '.PNG'],
      'image/jpeg': ['.jpeg', '.jpg', '.JPEG', '.JPG']
    },
    noClick: true,
    noKeyboard: true,
    multiple
  });
  
  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setFileUpload((prevData) => ({
        ...prevData,
        [name]: acceptedFiles[0].name
      }));
    }
  }, [acceptedFiles, setFileUpload, name]);
  
  const handleDelete = () => {
    setFileUpload((prevData) => ({
      ...prevData,
      [name]: ''
    }));
  };
  
  
  const files = (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={1} md={1} lg={1}>
        <UploadFile sx={{ color: blue[300] }} fontSize="small"/>
      </Grid>
      <Grid item xs={12} sm={9} md={7} lg={9}>
        <Typography sx={{ color: grey[600] }}>{fileUpload[name]}</Typography>
      </Grid>
      <Grid container item xs={12} sm={3} md={2} lg={2} justifyContent="space-between">
        <IconButton onClick={handleDelete}>
          <Delete sx={{ color: grey[600] }} fontSize="small"/>
        </IconButton>
        <CheckCircle sx={{ color: green[800], p: 7 }} fontSize="small"/>
      </Grid>
    </Grid>
  );
  
  return (
    <section>
      {fileUpload[name] === '' ? (
        <Container {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
          <UploadFile sx={{ color: blue[300] }} fontSize="small"/>
          <input {...getInputProps()} />
          <Typography color="#000">
            <LinkCSS underline="hover" onClick={open}>Click to upload </LinkCSS>
            or drag and drop
          </Typography>
          <Typography color="#757575">PNG or JPG (Max. 3MB) </Typography>
        </Container>
      ) : (
        <aside>{files}</aside>
      )}
    </section>
  );
};

const getColor = (props) => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isFocused) {
    return '#2196f3';
  }
  return '#eeeeee';
};

const Container = styled('div')`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
  height: 100px;
`;

const LinkCSS = styled(Link)(
  ({ theme }) => ({
    cursor: 'pointer'
  })
);
