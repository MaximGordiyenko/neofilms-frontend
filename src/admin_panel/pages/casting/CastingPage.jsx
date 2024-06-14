import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';

import { AdminTabPanel } from '../../components/tabs/AdminTabPanel.jsx';
import { MediaCard } from '../../components/card/MediaCard';

import { useDispatch } from 'react-redux';
import { getCastings, deleteCasting } from '../../store/thunk/casting.api';

export const CastingPage = ({ tab, cards, onAdd, buttonName }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(getCastings());
  }, [dispatch]);
  
  return (
    <AdminTabPanel value={tab} index={4}>
      <Box display="flex" alignItems="center" justifyContent="flex-end" overflow="scroll" py={60} px={5}>
        {cards?.map((card, idx) => (
          <MediaCard
            key={card.id}
            image={`/api/pages/casting/${card?.id}/image`}
            role={card.role}
            title={card.title}
            description={card.description}
            onDelete={() => {
              dispatch(deleteCasting(card.id));
              toast.error(`Casting ${idx + 1} was deleted`);
            }}
            onEdit={() => navigate(card.id)}
          />
        ))}
        <Button variant="contained" sx={{ minWidth: 150 }} onClick={onAdd}>{buttonName}</Button>
      </Box>
    </AdminTabPanel>
  );
};
