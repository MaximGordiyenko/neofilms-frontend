import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Button, Box } from '@mui/material';
import { Add } from '@mui/icons-material';

import { AdminTabPanel } from '../../components/tabs/AdminTabPanel.jsx';
import { MediaCard } from '../../components/card/MediaCard.jsx';

import { useDispatch } from 'react-redux';
import { deleteSlide, getSlides } from '../../store/thunk/slide.api.js';

export const SlidePage = ({ tab, cards, onAdd, buttonName }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getSlides());
  }, [dispatch]);
  
  return (
    <AdminTabPanel value={tab} index={0}>
      <Box display="flex" alignItems="center" overflow="scroll">
        {cards?.map((card, idx) => (
          <MediaCard
            key={card.id}
            title={`Slider ${idx + 1}`}
            image={`/api/pages/slide/${card?.id}/logo`}
            onDelete={() => {
              dispatch(deleteSlide(card.id));
              toast.error(`${card.logo_text} was deleted`);
            }}
            onEdit={() => navigate(card.id)}
          />
        ))}
        <Button variant="contained" endIcon={<Add/>} onClick={onAdd} sx={{ minWidth: 200 }}>{buttonName}</Button>
      </Box>
      <Outlet />
    </AdminTabPanel>
  );
};
