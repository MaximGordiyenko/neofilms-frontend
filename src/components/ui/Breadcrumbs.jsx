import { Breadcrumbs, Typography, Link, Stack } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../constants.js';

export const BreadCrumbs = ({ currentPage }) => {
  const navigate = useNavigate();
  
  const breadcrumbMapping = {
    [`${ROUTE.admin}/${ROUTE.mainSlider}`]: { main: 'Main Slider', sub: 'Add Slide' },
    [`${ROUTE.admin}/${ROUTE.allMovies}`]: { main: 'All Movies', sub: 'Add Movie' },
    [`${ROUTE.admin}/${ROUTE.web3project}`]: { main: 'Web 3 Project', sub: 'Add Project' },
    [`${ROUTE.admin}/${ROUTE.calendar}`]: { main: 'Calendar', sub: 'Add Event' },
    // Add more mappings as needed
  };
  
  const { main: mainPageLabel, sub: subPageLabel } = breadcrumbMapping[currentPage] || {};
  
  const handleClick = (event) => {
    event.preventDefault();
    if (currentPage === `${ROUTE.admin}/${ROUTE.mainSlider}`) {
      navigate(`/${ROUTE.admin}/${ROUTE.mainSlider}`);
    } else if (currentPage === `${ROUTE.admin}/${ROUTE.allMovies}`) {
      navigate(`/${ROUTE.admin}/${ROUTE.allMovies}`);
    } else if (currentPage === `${ROUTE.admin}/${ROUTE.web3project}`) {
      navigate(`/${ROUTE.admin}/${ROUTE.web3project}`);
    } else if (currentPage === `${ROUTE.admin}/${ROUTE.calendar}`) {
      navigate(`/${ROUTE.admin}/${ROUTE.calendar}`);
    }
  };
  
  return (
    <Stack spacing={2}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" color="primary" />} aria-label="breadcrumb">
        <Link underline="hover" color="text.primary" href="#" onClick={handleClick}>
          {mainPageLabel}
        </Link>
        <Typography color="text.primary">
          {subPageLabel}
        </Typography>
      </Breadcrumbs>
    </Stack>
  );
};
