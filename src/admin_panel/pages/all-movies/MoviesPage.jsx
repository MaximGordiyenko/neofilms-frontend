import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';

import { AdminTabPanel } from '../../components/tabs/AdminTabPanel.jsx';
import { MediaCard } from '../../components/card/MediaCard';

import { useDispatch } from 'react-redux';
import { deleteMovie, getMovies } from '../../store/thunk/movie.api.js';
import { Notification } from '../../components/notification/Notification';

export const MoviesPage = ({ tab, cards, onAdd, buttonName }) => {
  const [isNotify, setIsNotify] = useState(true);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch, getMovies]);
  
  return (
    <AdminTabPanel value={tab} index={1}>
      {isNotify ?
        <Notification
          message={`Please pay attention that you can add only ${5 - cards.length} Movies total`}
          onClick={() => setIsNotify(false)}
        />
        : null
      }
      <Box display="flex" alignItems="center" overflow="scroll" py={60} px={5}>
        {cards?.map((card, idx) => (
          <MediaCard
            key={card.id}
            image={`/api/pages/movie/${card?.id}/poster`}
            status={card.status}
            title={card.title}
            description={card.description}
            onDelete={() => {
              dispatch(deleteMovie(card.id));
              toast.error(`Movie ${idx + 1} was deleted`);
            }}
            onEdit={() => navigate(card.id)}
          />
        ))}
        <Button variant="contained" sx={{ minWidth: 150 }} disabled={cards.length >= 5}
                onClick={onAdd}>{buttonName}</Button>
      </Box>
    </AdminTabPanel>
  );
};
