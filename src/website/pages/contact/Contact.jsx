import Header from '../../components/header/Header';
import './style.scss';
import Form from '../../components/form/TestForm';
import imageForm from '../../assets/images/content-files-quill-ink-30.svg';
import { FooterCreds } from '../../components/credsFooter/FooterCreds';
import mapImg from '../../assets/images/map.jpg';
import botLine from '../../assets/images/footer-hp-placeholder.svg';
import topFrame from '../../assets/images/top-frame-map.svg';
import { HeaderContact } from './header/HeaderContact';
import { BodyContact } from './body/BodyContact';
const Contact = () => {
  //topFrame
  return (
    <div className={'contact-wrapper'}>
      <HeaderContact />
      <BodyContact />
      <FooterCreds />
    </div>
  );
};
 export default Contact;