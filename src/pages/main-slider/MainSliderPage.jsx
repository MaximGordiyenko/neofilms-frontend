import { Button, Box } from '@mui/material';
import { Add } from '@mui/icons-material';
import { AdminTabPanel } from '../../App.jsx';
import { MediaCard } from '../../components/card/MediaCard.jsx';

export const MainSliderPage = ({ tab, cards, onDelete, onAdd, buttonName }) => {
  return (
    <AdminTabPanel value={tab} index={0}>
      <Box display="flex" alignItems="center">
        {cards?.map(card => (
          <MediaCard
            key={card.id}
            title={card.title}
            image={card.image}
            onDelete={() => onDelete(card.id)}
          />
        ))}
        <Button variant="contained" endIcon={<Add/>} onClick={onAdd}>{buttonName}</Button>
      </Box>
    </AdminTabPanel>
  );
};
