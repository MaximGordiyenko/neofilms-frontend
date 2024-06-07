import { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { styled, Typography, Link, Grid, IconButton } from '@mui/material';
import { UploadFile, Delete, CheckCircle } from '@mui/icons-material';
import { blue, grey, green } from '@mui/material/colors';

export const FileUploader = ({ multiple, fileUpload, setFileUpload }) => {
  const { acceptedFiles, getRootProps, getInputProps, isFocused, isDragAccept, isDragReject, open } = useDropzone({
    accept: {
      'video/mp4': ['.mp4', '.MP4'],
      'image/png': ['.png', '.PNG'],
      'image/jpeg': ['.jpeg', '.jpg', '.JPEG', '.JPG']
    },
    noClick: true,
    noKeyboard: true,
    multiple
  });
  
  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setFileUpload(acceptedFiles);
    }
  }, [acceptedFiles, setFileUpload]);
  
  const handleDelete = (fileIndex) => {
    setFileUpload((prevFiles) => prevFiles.filter((_, index) => index !== fileIndex));
  };
  
  const files = fileUpload.map((file, idx) => (
    <Grid key={`${file.name}-${idx}`} container justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={12} md={12} lg={1}>
        <UploadFile sx={{ color: blue[300] }} fontSize="small"/>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={9}>
        <Typography sx={{ color: grey[600] }}>{file.name}</Typography>
        <Typography sx={{ color: grey[500] }}>{file.size} bytes · Complete</Typography>
      </Grid>
      <Grid container item xs={12} sm={12} md={12} lg={2} justifyContent="space-between">
        <IconButton onClick={() => handleDelete(idx)}>
          <Delete sx={{ color: grey[600] }} fontSize="small"/>
        </IconButton>
        <CheckCircle sx={{ color: green[800], p: 7 }} fontSize="small"/>
      </Grid>
    </Grid>
  ));

  return (
    <section>
      {fileUpload.length === 0 ? (
        <Container {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
          <UploadFile sx={{ color: blue[300] }} fontSize="small"/>
          <input {...getInputProps()} />
          <Typography>
            <LinkCSS underline="hover" onClick={open}>Click to upload</LinkCSS>
            or drag and drop
          </Typography>
          <Typography>MP4, PNG, or JPG (max. 3MB)</Typography>
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
