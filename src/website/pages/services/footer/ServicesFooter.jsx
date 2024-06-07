import { FooterCreds } from '../../../components/credsFooter/FooterCreds';
import lowerStroke from '../../../assets/images/footer-hp-placeholder.svg';
import img1 from '../../../assets/images/business-products-cash-user-man-message-49.svg';
import './style.scss';
import Form from '../../../components/form/TestForm';
export const ServicesFooter = () => {
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
            Id vivamus habitant ac lectus diam et. Dignissim at mauris sagittis nibh maecenas
            adipiscing. Facilisis enim nunc aliquet quis ipsum. Vitae id sodales nunc congue morbi
            consectetur sed.
          </p>
        </div>
        <Form />
      </div>
      <img src={lowerStroke} alt={'bottom-service-stroke'} className={'bottom-service-stroke'} />
    </div>
  );
};
