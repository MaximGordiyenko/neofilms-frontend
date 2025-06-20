import { FooterCreds } from '../../../components/credsFooter/FooterCreds';
import lowerStroke from '../../../assets/images/footer-hp-placeholder.svg';
import mobLine from '../../../assets/images/cast-footer-geometry.png'
import img1 from '../../../assets/images/business-products-cash-user-man-message-49.svg';
import './style.scss';
import Form from '../../../components/form/TestForm';
export const ServicesFooter = () => {
  const isMobile = window.innerWidth <= 430;

  return (
    <div className={'services-footer-wrapper'}>
      <div className={'linear'} />
      <div className={'form-box-services'}>
        <div className={'form-title-services'}>
          <span className={'idea'}>Have an idea</span>
          <div className={'title-box-service-f'}>
            <h5 className="serv-title">Let&apos;s Create Something Huge!</h5>
            <img src={img1} alt={'img-1-service-f'} className={'img-1-service-f'} />
          </div>
          <p>
            Bring your vision to life with Neofilms. Our expert team crafts stunning movies, from features to commercials. Contact us today to discuss your project.
          </p>
        </div>
        <Form />
      </div>
      <img src={isMobile ? mobLine : lowerStroke} alt={'bottom-service-stroke'} className={'bottom-service-stroke'} />
    </div>
  );
};
