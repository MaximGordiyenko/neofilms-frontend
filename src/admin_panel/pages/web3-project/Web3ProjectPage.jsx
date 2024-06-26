import { useEffect, useState } from 'react';
import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { AdminTabPanel } from '../../components/tabs/AdminTabPanel.jsx';
import { MediaCard } from '../../components/card/MediaCard';

import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { deleteProject, getProjects, getProjectMedia } from '../../store/thunk/project.api.js';
import { Notification } from '../../components/notification/Notification';

export const Web3ProjectPage = ({ tab, cards, onAdd, buttonName }) => {
  const [isNotify, setIsNotify] = useState(true);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch, getProjects]);
  
  return (
    <AdminTabPanel value={tab} index={2}>
      {isNotify ?
        <Notification
          message={`Please pay attention that you can add only ${5 - cards.length} Projects total`}
          onClick={() => setIsNotify(false)}
        />
        : null
      }
      <Box display="flex" alignItems="center" overflow="scroll" py={60} px={5}>
        {cards?.map((card, idx) => (
          <MediaCard
            key={card.id}
            image={`/api/pages/project/${card?.id}/image`}
            name={card.name}
            completion={card.completion}
            description={card.description}
            onDelete={() => {
              dispatch(deleteProject(card.id));
              toast.error(`Project ${idx + 1} was deleted`);
            }}
            onEdit={() => navigate(card.id)}
          />
        ))}
        <Button variant="contained" sx={{ minWidth: 150 }} onClick={onAdd}>{buttonName}</Button>
      </Box>
    </AdminTabPanel>
  );
};
