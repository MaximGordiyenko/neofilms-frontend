import './style.scss';
import Logo from '../../assets/images/neo_logo.svg';
import amazon from '../../assets/images/amazon-services.png';
import hulu from '../../assets/images/hulu-services.png';
import freeform from '../../assets/images/freeform-services.png';
import squareIcon from '../../assets/images/footer-square.svg';
import tetraSquare from '../../assets/images/footer-tetra.svg';
import discord from '../../assets/images/Discord.svg';
import x from '../../assets/images/X.svg';

export const FooterCreds = () => {
  return (
    <div className={'footer-creds'}>
      <div className={'fc-logo-box'}>
        <img src={Logo} alt={'f-c-logo'} />
        <p className={'copyrights-fc'}>
          Copyright © Neo Masterpiece Films LLC — All rights reserved
          <br />
          In order for holders to be entitled to the potential revenue share offered, it is required
          that all holders are active participants in the decision making process.
        </p>
      </div>
      <div className={'f-c-hr'} />
      <div className={'sponsors'}>
        <span className={'proud'}>PROUDLY ACCOMPANIED BY</span>
        <div className={'sponsors-box-fc'}>
          <img src={freeform} alt={'freeform-f-c'} className="freeform-logo-f"/>
          <img src={hulu} alt={'hulu-f-c'} className="hulu-logo-f"/>
          <img src={amazon} alt={'f-c-amazon'} className="amazon-logo-f"/>
        </div>
      </div>
      <div className={'f-c-hr'} />
      <div className={'other-logos'}>
        <img src={squareIcon} alt={'f-cred-squareIcon'} />
        <img src={tetraSquare} alt={'f-cred-tetraSquare'} />
      </div>
      <div className={'f-c-hr'} />
      <div className={'socials'}>
        <a href={'https://twitter.com/NeoFilmsNFT'}>
          <img src={x} alt={'x-cred-footer'} />
        </a>
        <a href={'https://discord.com/invite/brMNhjGdTn'}>
          <img src={discord} alt={'f-cred-discord'} />
        </a>
      </div>
    </div>
  );
};
