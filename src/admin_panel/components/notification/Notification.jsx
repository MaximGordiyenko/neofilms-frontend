import { Typography, Box, Grid, Button } from '@mui/material';
import alert from '../../assets/alert.svg';

export const Notification = ({ message, onClick }) => {
  return (
    <Grid container justifyContent="space-between" backgroundColor="#FFF4E5">
      <Grid item container lg={11} alignItems='center'>
        <Box component="img" src={alert} alt="alert" p={8}/>
        <Typography variant="subtitle2">{message}</Typography>
      </Grid>
      <Grid item lg={0.8}>
        <Button onClick={onClick}>Okey</Button>
      </Grid>
    </Grid>
  );
};
