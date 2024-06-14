import './style.scss';
import bodySymbols from '../../../assets/images/symbols-about-body.svg';
import faqImg from '../../../assets/images/img-question-about.svg';
import Accordion from '../../../components/accordion/Accrodion';
import { ACCORDION_PANELS } from '../../../constants/aboutConstants';
import topLine from '../../../assets/images/homepageline.svg';
import botLine from '../../../assets/images/homepagesec_line.svg';
import newsletterImg from '../../../assets/images/newsletter-img.svg';
import { Button } from '../../../components/button/Button';

export const BodyAbout = () => {
  return (
    <div className={'about-body-wrapper'}>
      <div className={'body-intro'}>
        <h3 className={'about-body-text'}>
          NEO is a full production service company based in Saint Louis.
          <br />
          <br />
          We have experience with all formats like feature films, commercials, TV series and other
          media.
          <br />
          <br />
          Our services available everywhere in US.
        </h3>
      </div>
      {/*<img src={ellipseBg} alt={'bg-ellipse'} className={'ellipseBg'} />*/}
      <div className={'postIntro-text'}>
        <img src={bodySymbols} alt={'post-text-symbols'} className={'post-text-symbols'} />
        <div className={'left-text-box'}>
          <h4 className={'title-l-text'}>Fermentum Aliquet Faucibus Porta Nisi</h4>
          <p className={'l-text'}>
            Neo Masterpiece Films is a production company that will leverage Blockchain technology
            as a disruptive tool to forever change filmmaking by providing everyone with actual
            value, usefulness, and ownership. We will construct a community that will prove to be
            vital to the film industry moving forward.
          </p>
        </div>
        <p className={'right-text'}>
          Our team has over two decades of experience in the film industry. Our team has experience
          working on projects currently on Freeform, Hulu, and Amazon Prime. Most recently awarded
          multiple accolades from San Francisco Indie film festival, Los Angeles International Film
          Festival, and many more. Our Team has one decade of experience in marketing and
          application development along with a heightened emphasis on Web3 Technologies, NFTs, and
          blockchain development. Technologies including Binance, Solana, Node.js, AWS, Flutter
          ..etc
        </p>
      </div>
      <div className={'faq-box'}>
        <div className={'title-faq'}>
          <h3>FAQ</h3>
          <img src={faqImg} alt={'faq-img'} className={'faq-img'} />
        </div>
        <Accordion panels={ACCORDION_PANELS} />
      </div>
      <div className={'join-newsletter-about'}>
        <img src={topLine} alt={'dots-about-top'} className={'dots-about-top'} />
        <div className={'inner-newsletter-content'}>
          <div className={'title-box'}>
            <span className={'news-span-about'}>Stay in tune</span>
            <div className={'about-title-box'}>
              <h6 className={'title-newsletter'}>Join our newsletter</h6>
              <img
                src={newsletterImg}
                alt={'newsletterImg-about'}
                className={'newsletterImg-about'}
              />
            </div>
          </div>
          <div className={'input-box-about'}>
            <p className={'join-text'}>
              The Film Studio for the people, by the people. The best of Web 3.0, NFT’s and Defi,
              blended with the best in Hollywood!
            </p>
            <div className={'inner-input-box'}>
              <input placeholder={'Enter your Email address'} className={'email-input'} />
              <Button text={'subscribe'} />
            </div>
          </div>
        </div>
        <img src={botLine} alt={'bot-line-about'} className={'bot-line-about'} />
      </div>
    </div>
  );
};
