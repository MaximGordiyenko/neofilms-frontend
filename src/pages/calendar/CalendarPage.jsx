import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';

import { MediaCard } from '../../components/card/MediaCard.jsx';
import { AdminTabPanel } from '../../App.jsx';

export const CalendarPage = ({ tab, cards, onDelete, onAdd, buttonName }) => {
  const navigate = useNavigate();
  
  return (
    <AdminTabPanel value={tab} index={3}>
      <Box display="flex" alignItems="center" flexDirection="row-reverse" justifyContent="flex-end">
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
