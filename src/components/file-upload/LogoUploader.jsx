import { Controller } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { styled } from "@mui/material";

export const LogoUploader = ({ control }) => {
  
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: 'image/*'
  });
  
  const files = acceptedFiles.map(file => (
    <div key={file?.path}>
      {file?.path} - {file.size} bytes
    </div>
  ));
  
  return (
    <div>
      <label htmlFor="image">Moview Logo (Title)</label>
      <Controller
        name="logo-title"
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <section className="container">
            <div {...getRootProps()} className="dropzone">
              <input {...getInputProps()} />
              <p>Drag 'n' drop an image file here, or click to select</p>
            </div>
            <aside>
              <h4>Files</h4>
              <ul>{files}</ul>
            </aside>
          </section>
        )}
      />
    </div>
  );
};
