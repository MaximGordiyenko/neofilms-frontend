import topFrame from '../../../assets/images/top-frame-map.svg';
import mapImg from '../../../assets/images/map.jpg';
import mapMob from '../../../assets/images/mapMob.jpg'
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
            <span>Studio Location</span>
            <h2>Visit Our Studio Location in New York</h2>
            <span className="subtitle-contact">(By appointment only)</span>
            <p>107 Memorial Dr, St. Louis, MO 63102</p>
            <Button text={'see more about'}/>
          </div>
        )}
        <div className={'map-box'}>
          {!isMobile && <img className={'top-line'} src={topFrame} alt={'top-map-frame'} />}
          <img src={isMobile ? mapMob : mapImg} alt={'contact-map'} className={'contact-map'} />
          {
            !isMobile &&
            <div className="address">
              <span>Studio Location</span>
              <h3>Visit Our Studio Location <br/>
                in Saint Louis</h3>
              <span className="subtitle-contact">(By appointment only)</span>
              <p>107 Memorial Dr, St. Louis, MO 63102</p>
            </div>
          }
        </div>
        {!isMobile && <img src={botLine} className={'bottom-line'} />}
      </div>
    </div>
  );
};
