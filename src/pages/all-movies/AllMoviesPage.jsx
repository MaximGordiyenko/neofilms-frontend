import { Button, Box } from '@mui/material';
import { MediaCard } from '../../components/card/MediaCard.jsx';
import { AdminTabPanel } from '../../App.jsx';

export const AllMoviesPage = ({ tab, cards, onDelete, onAdd, buttonName }) => {
  return (
    <AdminTabPanel value={tab} index={1}>
      <Box display="flex" alignItems="center">
        {cards?.map(card => (
          <MediaCard
            key={card.id}
            title={card.title}
            image={card.image}
            onDelete={() => onDelete(card.id)}
          />
        ))}
        <Button variant="contained" onClick={onAdd}>{buttonName}</Button>
      </Box>
    </AdminTabPanel>
  );
};
