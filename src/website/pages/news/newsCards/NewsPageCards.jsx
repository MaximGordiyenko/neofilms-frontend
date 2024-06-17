import './style.scss';
import { NEWS_CARDS } from '../../../constants/newsConstants';
import { Button } from '../../../components/button/Button';
import { FilledButton } from '../../../components/button/FilledButton';
import {Flex} from "../../../components/customDiv/Flex";
import {useMediaQuery} from "@mui/material";
export const NewsPageCards = () => {
  const isMobile = useMediaQuery('(max-width: 430px)');
  return (
    <div className="cards-news-wrapper">
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
