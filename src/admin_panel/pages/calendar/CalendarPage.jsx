import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';

import { AdminTabPanel } from '../../components/tabs/AdminTabPanel.jsx';
import { MediaCard } from '../../components/card/MediaCard';

import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { deleteCalendar, getCalendars } from '../../store/thunk/calendar.api.js';

export const CalendarPage = ({ tab, cards, onAdd, buttonName }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(getCalendars());
  }, [dispatch]);
  
  return (
    <AdminTabPanel value={tab} index={3}>
      <Box display="flex" alignItems="center" flexDirection="row-reverse" justifyContent="flex-end">
        {cards?.map(card => (
          <MediaCard
            key={card.id}
            date={card.date}
            name={card.name}
            description={card.description}
            onDelete={() => {
              dispatch(deleteCalendar(card.id));
              toast.error(`Event ${idx + 1} was deleted`);
            }}
            onEdit={() => navigate(card.id)}
          />
        ))}
        <Button variant="contained" onClick={onAdd}>{buttonName}</Button>
      </Box>
    </AdminTabPanel>
  );
};
