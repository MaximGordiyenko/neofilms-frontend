import { Controller, useFormContext } from "react-hook-form";
import { useDropzone } from "react-dropzone";

import { styled, Grid, Typography, Link, IconButton } from '@mui/material';
import { UploadFile, Delete, CheckCircle } from '@mui/icons-material';
import { blue, grey, green } from '@mui/material/colors';

import { updateField } from '../../store/reducers/slide.reducer.js';
import { useDispatch } from 'react-redux';

export const FileUploader = ({ name, value, multiple, ...rest }) => {
  const { control } = useFormContext();
  const dispatch = useDispatch();
  
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <Dropzone
          name={name}
          value={value}
          multiple={multiple}
          onChange={(e) => {
            console.log("File input change event:", e);
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

const Dropzone = ({ multiple, onChange, name, value, ...rest }) => {
  const { watch, setValue } = useFormContext();
  
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
      <Grid item xs={12} sm={12} md={12} lg={9.5}>
        <Typography sx={{ color: grey[600] }}>{file.name}</Typography>
        <Typography sx={{ color: grey[500] }}>{file.size}Kb · Complete</Typography>
      </Grid>
      <Grid container item xs={12} sm={12} md={12} lg={1.5} justifyContent="space-between">
        <IconButton onClick={() => setValue(name, null)}>
          <Delete sx={{ color: grey[600] }} fontSize="small"/>
        </IconButton>
        <CheckCircle sx={{ color: green[800], p: 7 }} fontSize="small"/>
      </Grid>
    </Grid>
  ));
  
  return (
    <section>
      {
        watch(name)
          ? <aside>{files}</aside>
          : <Container {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
            <UploadFile sx={{ color: blue[300] }} fontSize="small"/>
            <input {...getInputProps({ onChange })} />
            <Typography>
              <LinkCSS underline="hover" onClick={open}>Click to upload </LinkCSS>
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

export const LinkCSS = styled(Link)(
  ({ theme }) => ({
    cursor: 'pointer'
  })
);
