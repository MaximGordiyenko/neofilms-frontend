import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';

import { AdminTabPanel } from '../../components/tabs/AdminTabPanel.jsx';
import { MovieMediaCard } from '../../components/card/MovieMediaCard.jsx';

import { useDispatch } from 'react-redux';
import { deleteMovie, getMovies } from '../../store/apis/movie.api.js';

export const MoviesPage = ({ tab, cards, onAdd, buttonName }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);
  
  return (
    <AdminTabPanel value={tab} index={1}>
      <Box display="flex" alignItems="center">
        {cards?.map((card, idx) => (
          <MovieMediaCard
            key={card.id}
            image={card.image}
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
        <Button variant="contained" onClick={onAdd}>{buttonName}</Button>
      </Box>
    </AdminTabPanel>
  );
};
