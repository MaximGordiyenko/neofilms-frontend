import React from 'react';

const NewsCard = ({ mark, date, title, img, desc, className }) => {
  return (
    <div className={`news-card ${className}`}>
      <img src={img} alt={`news-${title}`} className={'background-news-img'} />
      <div className={'news-content'}>
        <div className={'upper-card-text'}>
          {mark && <span>{mark}</span>}
          <p className={'card-news-date'}>{date}</p>
        </div>
        <p className={'desc-box'}>{desc}</p>
      </div>
    </div>
  );
};

export default NewsCard;
