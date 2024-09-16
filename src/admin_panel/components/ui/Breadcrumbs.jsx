import { Breadcrumbs, Typography, Link, Stack } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../../constants.js';

export const BreadCrumbs = ({ currentPage }) => {
  const navigate = useNavigate();
  
  const breadcrumbMapping = {
    [`${ROUTE.admin}/${ROUTE.latestNews}`]: { main: 'Latest News', sub: 'Add News' },
    [`${ROUTE.admin}/${ROUTE.allMovies}`]: { main: 'All Movies', sub: 'Add Movie' },
    [`${ROUTE.admin}/${ROUTE.web3project}`]: { main: 'NEO', sub: 'Add Neo' },
    [`${ROUTE.admin}/${ROUTE.calendar}`]: { main: 'Calendar', sub: 'Add Event' },
    [`${ROUTE.admin}/${ROUTE.casting}`]: { main: 'Casting', sub: 'Add Casting' },
  };
  
  const { main: mainPageLabel, sub: subPageLabel } = breadcrumbMapping[currentPage] || {};
  
  const handleClick = (event) => {
    event.preventDefault();
    if (currentPage === `${ROUTE.admin}/${ROUTE.latestNews}`) {
      navigate(`/${ROUTE.admin}/${ROUTE.latestNews}`);
    }
    if (currentPage === `${ROUTE.admin}/${ROUTE.allMovies}`) {
      navigate(`/${ROUTE.admin}/${ROUTE.allMovies}`);
    }
    if (currentPage === `${ROUTE.admin}/${ROUTE.web3project}`) {
      navigate(`/${ROUTE.admin}/${ROUTE.web3project}`);
    }
    if (currentPage === `${ROUTE.admin}/${ROUTE.calendar}`) {
      navigate(`/${ROUTE.admin}/${ROUTE.calendar}`);
    }
    if (currentPage === `${ROUTE.admin}/${ROUTE.casting}`) {
      navigate(`/${ROUTE.admin}/${ROUTE.casting}`);
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
