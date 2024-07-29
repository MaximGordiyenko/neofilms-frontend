import { CardContent, Typography, CardMedia, CardActions, Button, Card } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import slide_placeholder from '../../assets/slide_placeholder.png';
import { ConvertDateUsFormat, formatStatus, trimText } from '../../helpers/common';

export const MediaCard = ({
                            status,
                            date,
                            name,
                            role,
                            completion,
                            title,
                            description,
                            content,
                            image,
                            onDelete,
                            onEdit,
                            width = `${250}px`,
                            isDelete
                          }) => {
  const formattedDate = ConvertDateUsFormat(date);
  const trimmedText = trimText(content, 100);
  
  return (
    <Card sx={{ width: width, mx: 10, overflow: 'initial', background: '#faf5f5' }} raised>
      {
        image && <CardMedia
          component="img"
          height="140"
          image={image ? image : slide_placeholder}
          src={image ? image : slide_placeholder}
          title="green iguana"
        />
      }
      <CardContent>
        {(status || role || formattedDate || completion) && (
          <Typography gutterBottom variant="subtitle2" color="primary">
            {formatStatus(status) || role || formattedDate || `Completion: ${completion}%`}
          </Typography>
        )}
        <Typography gutterBottom variant="h5" component="h3" color="primary">
          {title || name}
        </Typography>
        <Typography gutterBottom variant="body2" color="primary">
          {description}
        </Typography>
        {
          content &&
          <div dangerouslySetInnerHTML={{ __html: trimmedText }}/>
        }
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-around' }}>
        {isDelete &&
          <Button
            variant="contained"
            color="error"
            endIcon={<Delete/>}
            onClick={onDelete}
            sx={{ width: 100 }}>
            Delete
          </Button>
        }
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
