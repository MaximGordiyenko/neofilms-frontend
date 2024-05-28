import './style.scss';
import { HomepageHeader } from './header/HomepageHeader';
import { Body } from './body/Body';
import { Films } from './films/Films';
import { FooterHomepage } from './footer/Footer';
import { FooterCreds } from '../../components/credsFooter/FooterCreds';
export const HomePage = () => {
  return (
    <div className={'homepage-wrapper'}>
      <HomepageHeader />
      <Body />
      <div className={'films-bg-wrapper'}>
        <Films />
      </div>
      <FooterHomepage />
      <FooterCreds />
    </div>
  );
};
