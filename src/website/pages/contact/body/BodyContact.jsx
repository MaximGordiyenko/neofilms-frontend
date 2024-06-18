import topFrame from '../../../assets/images/top-frame-map.svg';
import mapImg from '../../../assets/images/map.jpg';
import mapMob from '../../../assets/images/mapMObile.png'
import botLine from '../../../assets/images/footer-hp-placeholder.svg';
import './style.scss';
import { Button } from '../../../components/button/Button';
export const BodyContact = () => {
  const isMobile = window.innerWidth <= 430;

  return (
    <div className={'body-contact-wrapper'}>
      <div className={'inner-contact-box'}>
        {isMobile && (
          <div className={'mobile-content'}>
            <span>Our stores</span>
            <h2>Visit Our New Store in New York</h2>
            <p>294 Bay Meadows Ave., Bay Shore, NY 11706</p>
            <Button text={'see more about'} />
          </div>
        )}
        <div className={'map-box'}>
          {!isMobile && <img className={'top-line'} src={topFrame} alt={'top-map-frame'} />}
          <img src={isMobile ? mapMob : mapImg} alt={'contact-map'} className={'contact-map'} />
        </div>
        {!isMobile && <img src={botLine} className={'bottom-line'} />}
      </div>
    </div>
  );
};
