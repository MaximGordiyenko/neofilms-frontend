import { CardContent, Typography, CardMedia, CardActions, Button, Card } from '@mui/material';
import slide_placeholder from '../../assets/slide_placeholder.png';
import { Delete, Edit } from '@mui/icons-material';

export const MovieMediaCard = ({ status, title, description, image, onDelete, onEdit }) => {
  return (
    <Card sx={{ width: 250, mx: 10, overflow: 'initial' }}>
      <CardMedia
        component="img"
        height="140"
        image={image ? image : slide_placeholder}
        src={image ? image : slide_placeholder}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="body1" color="primary">
          {status}
        </Typography>
        <Typography gutterBottom variant="h5" component="h3" color="primary">
          {title}
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
