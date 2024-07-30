import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Box } from '@mui/material';

import { AdminTabPanel } from '../../components/tabs/AdminTabPanel';
import { MediaCard } from '../../components/card/MediaCard';

import { useDispatch } from 'react-redux';
import { getNews } from '../../store/thunk/news';

export const LatestNewsPage = ({ tab, cards }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(getNews());
  }, [dispatch, getNews]);
  
  return (
    <AdminTabPanel value={tab} index={0}>
      <Box display="flex" alignItems="center" overflow="scroll" py={60} px={5}>
        {cards?.map((card) => (
          <MediaCard
            key={String(card.id)}
            image={`/api/pages/short_news/${card?.id}/image`}
            date={card.date}
            title={card.title}
            description={card.description}
            width={`${550}px`}
            isDelete={false}
            onEdit={() => navigate(String(card.id))}
          />
        ))}
      </Box>
    </AdminTabPanel>
  );
};
