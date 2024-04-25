import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import { Add } from '@mui/icons-material';

import { AdminTabPanel } from '../../App.jsx';
import { MediaCard } from '../../components/card/MediaCard.jsx';

export const MainSliderPage = ({ tab, cards, onDelete, onEdit, onAdd, buttonName }) => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  
  return (
    <AdminTabPanel value={tab} index={0}>
      <Box display="flex" alignItems="center">
        {cards?.map(card => (
          <MediaCard
            key={card.id}
            title={card.title}
            image={card.image}
            onDelete={() => onDelete(card.id)}
            onEdit={() => navigate(card.id)}
            sliderId={card.id}
          />
        ))}
        <Button variant="contained" endIcon={<Add/>} onClick={onAdd}>{buttonName}</Button>
      </Box>
      <Outlet />
    </AdminTabPanel>
  );
};
