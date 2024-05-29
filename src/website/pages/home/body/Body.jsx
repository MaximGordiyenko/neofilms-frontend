import './style.scss';
import dotsTop from '../../../assets/images/image 16.svg';
import topLine from '../../../assets/images/homepageline.svg';
import topMobileLine from '../../../assets/images/mob-up-hr.svg';
import botMobLine from '../../../assets/images/Divider_Mobile.png';
import botLine from '../../../assets/images/homepagesec_line.svg';
import hand from '../../../assets/images/hand-love-sign-15.svg';
import dots from '../../../assets/images/thripleDots.svg';
import fireball from '../../../assets/images/ecology-global-warming-globe-fire-31.svg';
import { Button } from '../../../components/button/Button';
import lowerLine from '../../../assets/images/down_block-placeholder.svg';
import lowerMobLine from '../../../assets/images/bot-body-mob-stroke.png';
import { LATEST_NEWS_CARDS } from '../../../constants/homePageConst';
import NewsCard from './NewsCards';

export const Body = () => {
  const isMobile = window.innerWidth <= 430;

  return (
    <div className={'hp-body-wrapper'}>
      {/*<div className={'linear-bg-top'} />*/}
      <div className={'bg-wrapper'}>
        <img src={dotsTop} className={'top-body-dots'} alt={'body-dots'} />
        <div className={'what_is_neo'}>
          {isMobile ? (
            <img src={topMobileLine} alt={'top-mob-hr-hp'} />
          ) : (
            <img src={topLine} alt={'neo-f-line'} />
          )}
          <div className={'neo-body-text'}>
            <div className={'neo-description'}>
              <span className={'sub-title-body'}>What is Neo masterpiece films?</span>
              {isMobile ? (
                <div className={'mob-text-wrapper'}>
                  <div className={'mob-text-box'}>
                    <p>A Web 3 Film Studio.</p>
                    <p>For the People,</p>
                    <p>by the People.</p>
                  </div>
                  <img src={hand} alt={'hand'} className={'hand'} />
                </div>
              ) : (
                <p className={'title-body-text'}>
                  A Web 3 Film Studio. For the People, by the People.
                  <img src={hand} alt={'hand'} className={'hand'} />
                </p>
              )}
            </div>
            <p className={'neo-text'}>
              We are revolutionizing the filmmaking industry by successfully leveraging Blockchain
              technology. Direct, trackable ownership enables value to be shared without middle-men,
              and the community that is created is unparalleled in its power to grow the business.
            </p>
          </div>
          {isMobile ? (
            <img src={botMobLine} alt={'bot-mob-hr-hp'} />
          ) : (
            <img src={botLine} alt={'neo-b-line'} />
          )}
        </div>
      </div>
      <div className={'main-hp-body-title'}>
        <div className={'box-title-name'}>
          <h3 className={'title-text'}>
            neo films latest news <img src={fireball} alt={'hp-body-fireball'} />
          </h3>
          <div className={'button-box'}>
            <img src={dots} alt={'hp-b-dots'} />
            <div className={'hr-line'} />
            <Button text={'other news'} width={'210px'} />
          </div>
        </div>
        <div className={'hp-cards-body-box'}>
          {LATEST_NEWS_CARDS.map((card, index) => (
            <NewsCard
              key={index}
              mark={card.mark}
              date={card.date}
              title={card.title}
              img={card.img}
              buttonText={card.buttonText}
              desc={card.desc}
              glitchEffect={card.glitchEffect}
            />
          ))}
          {isMobile && (
            <div className={'btn-mob-wrapper'}>
              <Button text={'more news'} width={'100%'} />
            </div>
          )}
        </div>
      </div>
      {isMobile ? (
        <img src={lowerMobLine} alt={'hp-mob-lower-line'} className={'hp-b-lower-line'} />
      ) : (
        <img src={lowerLine} alt={'hp-b-lower-line'} className={'hp-b-lower-line'} />
      )}
      {/*<div className={'linear-bg-bottom'} />*/}
    </div>
  );
};
