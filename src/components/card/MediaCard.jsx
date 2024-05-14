import { Delete, Edit } from '@mui/icons-material';
import { CardMedia, CardContent, Button, Typography, Card, CardActions } from '@mui/material';
import slide_placeholder from '../../assets/slide_placeholder.png'

export const MediaCard = ({ title, image, onDelete, onEdit }) => {
  return (
    <Card sx={{ width: 250, mx: 10, overflow: 'initial', background: '#faf5f5' }} raised>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h3" color="primary">
          {title}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        height="140"
        image={image ? image : slide_placeholder}
        src={image ? image : slide_placeholder}
        title="green iguana"
      />
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
