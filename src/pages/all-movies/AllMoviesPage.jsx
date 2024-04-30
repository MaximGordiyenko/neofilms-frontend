import { Button, Box } from '@mui/material';
import { MediaCard } from '../../components/card/MediaCard.jsx';
import { AdminTabPanel } from '../../App.jsx';
import { useNavigate } from 'react-router-dom';

export const AllMoviesPage = ({ tab, cards, onDelete, onAdd, buttonName }) => {
  const navigate = useNavigate();
  
  return (
    <AdminTabPanel value={tab} index={1}>
      <Box display="flex" alignItems="center">
        {cards?.map(card => (
          <MediaCard
            key={card.id}
            title={card.title}
            image={card.image}
            onDelete={() => onDelete(card.id)}
            onEdit={() => navigate(card.id)}
          />
        ))}
        <Button variant="contained" onClick={onAdd}>{buttonName}</Button>
      </Box>
    </AdminTabPanel>
  );
};
