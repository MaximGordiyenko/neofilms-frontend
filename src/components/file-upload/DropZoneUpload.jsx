import { Controller, useFormContext } from "react-hook-form";
import { useDropzone } from "react-dropzone";

import { styled, Grid, Typography } from '@mui/material';
import { UploadFile, Delete, CheckCircle } from '@mui/icons-material';
import { blue, grey, green } from '@mui/material/colors';

import { updateField } from '../../store/sliderPageSlice.jsx';
import { useDispatch } from 'react-redux';

export const DropzoneField = ({ name, multiple, ...rest }) => {
  const { control } = useFormContext();
  const dispatch = useDispatch();
  
  return (
    <Controller
      render={({ field: { onChange } }) => (
        <Dropzone
          multiple={multiple}
          onChange={(e) => {
            onChange(
              multiple
                ? e.target.files
                : e.target.files?.[0] ?? null
            );
            dispatch(updateField({ field: name, value: e.target.files?.[0] ?? null }));
          }
          }
          {...rest}
        />
      )}
      name={name}
      control={control}
      defaultValue=""
    />
  );
};

const Dropzone = ({ multiple, onChange, ...rest }) => {
  const { watch } = useFormContext();
  
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
        <Delete sx={{ color: grey[600] }} fontSize="small"/>
        <CheckCircle sx={{ color: green[800] }} fontSize="small"/>
      </Grid>
    </Grid>
  ));

  return (
    <section className="container">
      {
        files.length ?
          <aside>{files}</aside>
          :
          <Container {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
            <input {...getInputProps({ onChange })} />
            <Typography>
              <button type="button" onClick={open}>Click to upload</button>
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
`;
