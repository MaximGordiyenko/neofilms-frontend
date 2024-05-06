import { Controller, useFormContext } from "react-hook-form";
import { useDropzone } from "react-dropzone";

import { styled, Grid, Typography, Link } from '@mui/material';
import { UploadFile, Delete, CheckCircle } from '@mui/icons-material';
import { blue, grey, green } from '@mui/material/colors';

import { updateField } from '../../store/sliderPageSlice.js';
import { useDispatch } from 'react-redux';

import "./styles.css";

export const FileUploader = ({ name, value, multiple, ...rest }) => {
  const { control } = useFormContext();
  const dispatch = useDispatch();

  return (
    <Controller
      name={name}
      value={value}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <Dropzone
          multiple={multiple}
          onChange={(e) => {
            field.onChange(
              multiple
                ? e.target.files
                : e.target.files?.[0] ?? null
            );
            dispatch(updateField({ field: name, value: e.target.files?.[0] ?? null }));
          }}
          {...rest}
        />
      )}
    />
  );
};

const Dropzone = ({ multiple, onChange, ...rest }) => {
  const { watch } = useFormContext();
  const dispatch = useDispatch();
  
  const { acceptedFiles, getRootProps, getInputProps, isFocused, isDragAccept, isDragReject, open } = useDropzone({
    accept: {
      'video/mp4': ['.mp4', '.MP4'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg']
    },
    noClick: true,
    noKeyboard: true,
    multiple,
    ...rest
  });
  
  const files = acceptedFiles.map((file, idx) => (
    <Grid key={`${file.name}-${idx}`} container justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={12} md={12} lg={1}>
        <UploadFile sx={{ color: blue[300] }} fontSize="small"/>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={10}>
        <Typography sx={{ color: grey[600] }}>{file.name}</Typography>
        <Typography sx={{ color: grey[500] }}>{file.size}Kb · Complete</Typography>
      </Grid>
      <Grid container item xs={12} sm={12} md={12} lg={1} justifyContent="space-between">
        <Delete sx={{ color: grey[600] }} fontSize="small" onClick={() =>  dispatch(updateField({ field: name, value: null }))}/>
        <CheckCircle sx={{ color: green[800] }} fontSize="small"/>
      </Grid>
    </Grid>
  ));
  
  return (
    <section className="upload-container">
      {
        files.length ?
          <aside>{files}</aside>
          :
          <Container {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
            <UploadFile sx={{ color: blue[300] }} fontSize="small"/>
            <input {...getInputProps({ onChange })} />
            <Typography>
              <Link onClick={open}>Click to upload </Link>
              or drag and drop</Typography>
            <Typography>MP4, PNG, or JPG (max. 3MB)</Typography>
          </Container>
      }
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
