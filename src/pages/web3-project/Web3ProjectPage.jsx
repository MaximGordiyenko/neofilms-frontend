import { useEffect } from 'react';
import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { AdminTabPanel } from '../../components/tabs/AdminTabPanel.jsx';
import { ProjectMediaCard } from '../../components/card/ProjectMediaCard.jsx';

import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { deleteProject, getProjects } from '../../store/apis/project.api.js';

export const Web3ProjectPage = ({ tab, cards, onAdd, buttonName }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);
  
  return (
    <AdminTabPanel value={tab} index={2}>
      <Box display="flex" alignItems="center" flexDirection="row-reverse" justifyContent="flex-end">
        {cards?.map(card => (
          <ProjectMediaCard
            key={card.id}
            image={card.image}
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
        <Button variant="contained" onClick={onAdd}>{buttonName}</Button>
      </Box>
    </AdminTabPanel>
  );
};
