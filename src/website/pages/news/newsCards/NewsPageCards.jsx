import './style.scss';
import { NEWS_CARDS } from '../../../constants/newsConstants';
import { Button } from '../../../components/button/Button';
import { FilledButton } from '../../../components/button/FilledButton';
import {useMediaQuery} from "@mui/material";
import {useState, useEffect} from "react";
import axios from "axios";

export const NewsPageCards = () => {
  const isMobile = useMediaQuery('(max-width: 430px)');
  const [newsCards, setNewsCards] = useState([]);

  useEffect(() => {
    fetchNewsCards();
  }, []);

  const fetchNewsCards = async () => {
    try {
      const response = await axios.get('/api/pages/events', {
        withCredentials: true,
      });

      const transformedData = response.data.map(item => ({
        ...item,
        updated_at: new Date(item.updated_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        description: item.description.length > 250 ? `${item.description.slice(0, 250)}...` : item.description,
      }));

      setNewsCards(transformedData);
    } catch (error) {
      console.error('Error fetching news cards:', error);
    }
  };
  const renderLatestNews = newsCards.slice(-2);

  console.log(newsCards, 'news')
  return (
    <div className="cards-news-wrapper">
      <div className="news-container">
        <FilledButton btnText="cooming soon"/>
        {renderLatestNews.map((item, i) => (
          <div className={'news_page-card'} key={item._id}>
            <div className={'other-cards'} style={{ borderBottom: '1px solid rgba(250, 250, 250, 0.2)' }}>
              <div className={'date-news-o-card'}>
                <span className={'other-card-date'}>{item.updated_at}</span>
              </div>
              <h5 className={'other-card-title'}>{item.name}</h5>
              <p className={'other-card-text'}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      {NEWS_CARDS.map((item, i) => {
        return (
          <div className={'news_page-card'} key={i}>
            {item.buttonMainText && <FilledButton btnText={item.buttonMainText} />}
            {item.latestNews && item.oldNews ? (
              <>
                <div
                  className={'news-card-title'}
                  style={{ borderBottom: item.latestNews[0].borderBottom }}>
                  <span className={'main-card-date'}>{item.latestNews[0].date}</span>
                  <h6 className={'main-card-title'}>{item.latestNews[0].title}</h6>
                  <p className={'main-card-text'}>{item.latestNews[0].text}</p>
                </div>
                <div
                  className={'news-card-title'}
                  style={{ borderBottom: item.latestNews[0].borderBottom }}>
                  <span className={'main-card-date'}>{item.oldNews[0].date}</span>
                  <h6 className={'main-card-title'}>{item.oldNews[0].title}</h6>
                  <p className={'main-card-text'}>{item.oldNews[0].text}</p>
                </div>
              </>
            ) : (
              <div className={'other-cards'} style={{ borderBottom: item.borderBottom }}>
                <img src={item.img} alt={'card-news-image'} />
                <div className={'date-news-o-card'}>
                  <span className={'other-card-news'}>News</span>
                  <span className={'other-card-date'}>{item.date}</span>
                </div>
                <h5 className={'other-card-title'}>{item.title}</h5>
                <p className={'other-card-text'}>{item.text}</p>
                <Button text={item.buttonText} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
