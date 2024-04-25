import { Controller } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { styled, FormControl } from "@mui/material";

export const FileUpload = ({ control }) => {
  
  const { acceptedFiles, getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    accept: 'image/*, video/*'
  });
  
  const files = acceptedFiles.map(file => (
    <div key={file?.path}>
      {file?.path} - {file.size} bytes
    </div>
  ));
  
  return (
    <FormControl>
      <label htmlFor="image">Main Image or Video</label>
      <Controller
        name="image-video-slider"
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <section className="container">
            <Container {...getRootProps({isFocused, isDragAccept, isDragReject})}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop a video file here, or click to select</p>
            </Container>
            <aside>
              <ul>{files}</ul>
            </aside>
          </section>
        )}
      />
    </FormControl>
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
}

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
