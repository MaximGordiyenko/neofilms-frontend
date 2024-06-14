import React from 'react';
import { Button } from '../../../components/button/Button';

const NewsCard = ({ mark, date, title, img, buttonText, desc }) => {
  return (
    <div className={'news-card'}>
      <img src={img} alt={`news-${title}`} className={'background-news-img'} />
      <div className={'news-content'}>
        <div className={'upper-card-text'}>
          {mark && <span>{mark}</span>}
          <p className={'card-news-date'}>{date}</p>
        </div>
        <p className={'desc-box'}>{desc}</p>
        {/*<Button text={buttonText} style={{ width: '100%' }} />*/}
      </div>
    </div>
  );
};

export default NewsCard;
