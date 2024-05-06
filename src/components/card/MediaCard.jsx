import { Delete, Edit } from '@mui/icons-material';
import { CardMedia, CardContent, Button, Typography, Card, CardActions } from '@mui/material';
import slide_placeholder from '../../assets/slide_placeholder.png'

export const MediaCard = ({ title, image, onDelete, onEdit }) => {
  return (
    <Card sx={{ maxWidth: 345, mx: 10 }}>
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
      <CardActions>
        <Button variant="contained" color="error" endIcon={<Delete/>} onClick={onDelete}>
          Delete
        </Button>
        <Button variant="contained" endIcon={<Edit/>} onClick={onEdit}>
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};
