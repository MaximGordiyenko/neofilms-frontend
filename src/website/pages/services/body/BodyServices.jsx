import './style.scss';
import { SERVICES_CARDS } from '../../../constants/servicesCards';
import cardBg from '../../../assets/images/cardBg.svg';
import upperDots from '../../../assets/images/image 16.svg';

export const ServicesBody = () => {
  return (
    <div className={'services-body-wrapper'}>
      <img src={upperDots} alt={'up-dots'} className={'up-dots-services-b'} />
      <div className={'cards-box-services'}>
        {SERVICES_CARDS.map((item, i) => {
          return (
            <div className={'service-card'} key={i}>
              <img src={cardBg} alt={'cardBg'} className={'cardBg-img'} />
              <div className={'title-s-card'}>
                <img src={item.img} />
                <h4>{item.title}</h4>
              </div>
              <div className={'card-s-desc'}>{item.text}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
