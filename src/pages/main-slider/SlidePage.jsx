import { Outlet, useNavigate, useLocation, useParams } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import { Add } from '@mui/icons-material';

import { AdminTabPanel } from '../../App.jsx';
import { MediaCard } from '../../components/card/MediaCard.jsx';

export const SlidePage = ({ tab, cards, onDelete, onAdd, buttonName }) => {
  const navigate = useNavigate();

  return (
    <AdminTabPanel value={tab} index={0}>
      <Box display="flex" alignItems="center">
        {cards?.map(card => (
          <MediaCard
            key={card.id}
            title={card.logo_text}
            image={card.logo_media}
            onDelete={() => onDelete(card.id)}
            onEdit={() => navigate(card.id)}
          />
        ))}
        <Button variant="contained" endIcon={<Add/>} onClick={onAdd}>{buttonName}</Button>
      </Box>
      <Outlet />
    </AdminTabPanel>
  );
};
