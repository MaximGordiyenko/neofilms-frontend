import { Outlet, useNavigate } from 'react-router-dom';

import { Button, Box } from '@mui/material';
import { Add } from '@mui/icons-material';

import { AdminTabPanel } from '../../components/tabs/AdminTabPanel.jsx';
import { MediaCard } from '../../components/card/MediaCard.jsx';

import { deleteSlide } from '../../store/apis/slide.api.js';
import { useDispatch } from 'react-redux';

import slider_placeholder from '../../assets/slide_placeholder.png';
import { toast } from 'react-toastify';

export const SlidePage = ({ tab, cards, onAdd, buttonName }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  return (
    <AdminTabPanel value={tab} index={0}>
      <Box display="flex" alignItems="center" overflow="scroll">
        {cards?.map((card, idx) => (
          <MediaCard
            key={card.id}
            title={`Slider ${idx + 1}`}
            image={slider_placeholder}
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
