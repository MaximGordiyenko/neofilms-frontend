import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Button, Box } from '@mui/material';
import { Add } from '@mui/icons-material';

import { AdminTabPanel } from '../../components/tabs/AdminTabPanel.jsx';
import { MediaCard } from '../../components/card/MediaCard.jsx';

import { useDispatch } from 'react-redux';
import { deleteSlide, getSlides } from '../../store/thunk/slide.api.js';
import { Notification } from '../../components/notification/Notification';

export const SlidePage = ({ tab, cards, onAdd, buttonName }) => {
  const [isNotify, setIsNotify] = useState(true);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  
  useEffect(() => {
    dispatch(getSlides());
  }, [dispatch, getSlides]);
  
  return (
    <AdminTabPanel value={tab} index={0}>
      {isNotify ?
        <Notification
          message={`Please pay attention that you can add only ${5 - cards.length} Slides total`}
          onClick={() => setIsNotify(false)}
        />
        : null
      }
      <Box display="flex" alignItems="center" overflow="scroll" py={30} px={5}>
        {cards?.map((card) => (
          <MediaCard
            key={card.id}
            title={card.logo_text}
            image={`/api/pages/slide/${card?.id}/logo`}
            onDelete={() => {
              dispatch(deleteSlide(card.id));
              toast.error(`${card.logo_text} was deleted`);
            }}
            onEdit={() => navigate(card.id)}
          />
        ))}
        <Button variant="contained" endIcon={<Add/>} onClick={onAdd} sx={{ minWidth: 200 }}
                disabled={cards.length >= 5}>
          {buttonName}
        </Button>
      </Box>
      <Outlet/>
    </AdminTabPanel>
  );
};
