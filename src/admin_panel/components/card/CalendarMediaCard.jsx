import { Delete, Edit } from '@mui/icons-material';
import { CardContent, Button, Typography, Card, CardActions } from '@mui/material';
import { ConvertDateUsFormat } from '../../helpers/common.js';

export const CalendarMediaCard = ({ name, date, description, onDelete, onEdit }) => {
  
  const formattedDate = ConvertDateUsFormat(date);
  
  return (
    <Card sx={{ width: 250, mx: 10, overflow: 'initial', background: '#faf5f5' }} raised>
      <CardContent>
        <Typography gutterBottom variant="body1" color="primary">
          {formattedDate}
        </Typography>
        <Typography gutterBottom variant="h5" component="h3" color="primary">
          {name}
        </Typography>
        <Typography gutterBottom variant="body2" color="primary">
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-around' }}>
        <Button
          variant="contained"
          color="error"
          endIcon={<Delete/>}
          onClick={onDelete}
          sx={{ width: 100 }}>
          Delete
        </Button>
        <Button
          variant="contained"
          endIcon={<Edit/>}
          onClick={onEdit}
          sx={{ width: 100 }}>
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};
