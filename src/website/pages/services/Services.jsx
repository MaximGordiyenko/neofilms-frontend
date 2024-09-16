import { ServicesHeader } from './header/ServicesHeader';
import { ServicesBody } from './body/BodyServices';
import { ServicesFooter } from './footer/ServicesFooter';
import { FooterCreds } from '../../components/credsFooter/FooterCreds';

const Services = () => {
  return (
    <>
      <ServicesHeader />
      <ServicesBody />
      <ServicesFooter />
      <FooterCreds />
    </>
  );
};

export default Services;
