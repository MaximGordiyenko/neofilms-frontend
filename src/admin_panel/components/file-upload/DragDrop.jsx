import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { styled, Box, Typography, Button } from "@mui/material";
import { FileDownloadOutlined, VisibilityOutlined, ClearOutlined } from '@mui/icons-material';

export const DragDrop = ({ name, isMultiple, isDisable }) => {
  const [openModal, setOpenModal] = useState(false);
  const { register, unregister, setValue, getValues, watch } = useFormContext();
  
  const files = watch(name) || [];
  
  const onDrop = useCallback(
    droppedFiles => setValue(name, droppedFiles, { shouldValidate: true }),
    [setValue, name]
  );
  
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
    disabled: isDisable,
    multiple: isMultiple,
    accept: {
      'video/mp4': ['.mp4', '.MP4'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg']
    },
  });
  
  const removeFile = file => e => {
    e.stopPropagation();
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setValue(name, newFiles);
  };
  
  useEffect(() => {
    register(name);
    return () => unregister(name);
  }, [register, unregister, name]);
  
  return (
    <Container
      {...getRootProps()}
      active={isDragActive ? 1 : 0}
      id={name}>
      <input {...getInputProps()}/>
      
      <Box display="flex" alignItems="center" justifyContent="center" height="10rem">
        {!files?.length &&
          <Box display="flex" flexDirection="column" alignItems="center">
            <FileDownloadOutlinedCSS/>
            <TypographyCSS>bla</TypographyCSS>
          </Box>
        }
        
        {!!files?.length &&
          <ul style={{ display: 'flex', flexDirection: "row" }}>
            {files?.map(file =>
              <ItemCSS key={file.name}>
                <Box>
                  <VisibilityOutlinedCSS onClick={() => setOpenModal(!openModal)}/>
                  <ClearOutlinedCSS onClick={removeFile(file)}/>
                </Box>
                <Typography variant="caption">{file.name}</Typography>
              </ItemCSS>
            )}
          </ul>
        }
      </Box>
      
      <AsideCSS>
        <TypographyCSS sx={{ pr: 10 }}>
          bla {!!files?.length && files.length}
        </TypographyCSS>
        <Button
          disabled={!!getValues('url') && !!getValues('urlName')}
          onClick={open}
          size="small"
          type="button"
          variant="contained">
          Click on me
        </Button>
      </AsideCSS>
    </Container>
  );
};

const Container = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-width: 2px;
  border-radius: 10px;
  border-color: ${({ active }) => active ? "green" : 'rgba(59, 65, 92, 0.75)'};
  border-style: dashed;
  background: rgba(98, 105, 138, 0.05);
  font-weight: bold;
  font-size: 1.4rem;
  outline: none;
  transition: border 0.24s ease-in-out;
  position: relative;
`;

const FileDownloadOutlinedCSS = styled(FileDownloadOutlined)`
  color: ${({ theme }) => theme.palette.background.filled};
`;

const TypographyCSS = styled(Typography)`
  color: ${({ theme }) => theme.palette.background.filled};
`;

const AsideCSS = styled('aside')`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  position: absolute;
  top: 0;
  right: 0;
  background: rgba(59, 65, 92, 0.25);
  padding: 8px;
  margin: 10px;
  border-radius: 7px;
`;

const ItemCSS = styled('li')`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  width: 100px;
  height: 150px;
  margin: 10px;
  background-color: white;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const VisibilityOutlinedCSS = styled(VisibilityOutlined)`
  background: #7B9EFF;
  margin: 5px;
  border-radius: ${({ theme }) => theme.shape.radius};
  
  &:hover {
    background: #3d6cef;
  }
`;

const ClearOutlinedCSS = styled(ClearOutlined)`
  background: #FF7B7B;
  margin: 5px;
  border-radius: ${({ theme }) => theme.shape.radius};
  
  &:hover {
    background: #e6455a;
  }
`;
