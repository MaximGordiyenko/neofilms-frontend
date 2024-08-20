import { AboutHeader } from './header/AboutHeader';
import { FooterCreds } from '../../components/credsFooter/FooterCreds';
import { BodyAbout } from './body/BodyAbout';

const AboutPage = () => {
  return (
    <div className={'about-page-main'}>
      <AboutHeader />
      <BodyAbout />
      <FooterCreds />
    </div>
  );
};

export default AboutPage;
