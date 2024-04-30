import Card from '@mui/material/Card';
import { Delete, Edit } from '@mui/icons-material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const MediaCard = ({ title, image, onDelete, onEdit }) => {
  return (
    <Card sx={{ maxWidth: 345, mx: 10 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h3" color="primary">
          {title}
        </Typography>
      </CardContent>
      <CardMedia
        sx={{ height: 140 }}
        image={image}
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
