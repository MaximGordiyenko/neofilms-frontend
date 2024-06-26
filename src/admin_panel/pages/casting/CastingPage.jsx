import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';

import { AdminTabPanel } from '../../components/tabs/AdminTabPanel.jsx';
import { MediaCard } from '../../components/card/MediaCard';

import { useDispatch } from 'react-redux';
import { getCastings, deleteCasting } from '../../store/thunk/casting.api';
import { Notification } from '../../components/notification/Notification';

export const CastingPage = ({ tab, cards, onAdd, buttonName }) => {
  const [isNotify, setIsNotify] = useState(true);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(getCastings());
  }, [dispatch, getCastings]);
  
  return (
    <AdminTabPanel value={tab} index={4}>
      {isNotify ?
      <Notification
        message={`Please pay attention that you can add only ${5 - cards.length} Castings total`}
        onClick={() => setIsNotify(false)}
      />
      : null
    }
      <Box display="flex" alignItems="center" overflow="scroll" py={60} px={5}>
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
