import { useEffect } from 'react';
import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { AdminTabPanel } from '../../components/tabs/AdminTabPanel.jsx';
import { MediaCard } from '../../components/card/MediaCard';

import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { deleteProject, getProjects } from '../../store/thunk/project.api.js';

export const Web3ProjectPage = ({ tab, cards, onAdd, buttonName }) => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch, getProjects]);
  
  return (
    <AdminTabPanel value={tab} index={2}>
      <Box display="flex" alignItems="center" overflow="scroll" py={60} px={5}>
        {cards?.map((card, idx) => (
          <MediaCard
            key={card.id}
            image={`/api/pages/project/${card?.id}/image`}
            name={card.name}
            completion={card.completion}
            description={card.description}
            isDelete={true}
            onDelete={() => {
              dispatch(deleteProject(card.id));
              toast.error(`Project "${idx + 1}" was delete successfuly`);
            }}
            onEdit={() => navigate(card.id)}
          />
        ))}
        <Button variant="contained" sx={{ minWidth: 150 }} onClick={onAdd}>{buttonName}</Button>
      </Box>
    </AdminTabPanel>
  );
};
