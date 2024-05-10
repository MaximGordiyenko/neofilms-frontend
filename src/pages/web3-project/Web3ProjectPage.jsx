import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { MediaCard } from '../../components/card/MediaCard.jsx';
import { AdminTabPanel } from '../../components/tabs/AdminTabPanel.jsx';

export const Web3ProjectPage = ({ tab, cards, onDelete, onAdd, buttonName }) => {
  const navigate = useNavigate();
  
  return (
    <AdminTabPanel value={tab} index={2}>
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
