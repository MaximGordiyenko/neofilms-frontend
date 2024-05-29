import './style.scss';
import neoLogo from '../../assets/images/neo_logo.svg';
import x from '../../assets/images/X.svg';
import discord from '../../assets/images/Discord.svg';
import './style.scss';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 430;
  return (
    <div className="header">
      {isMobile ? (
        <img
          src={neoLogo}
          alt="logo"
          onClick={() => navigate('/', { replace: true })}
          className={'logo-header'}
        />
      ) : (
        <div className={'glitch-img'}>
          <img
            src={neoLogo}
            alt="logo"
            onClick={() => navigate('/', { replace: true })}
            className={'logo-header'}
          />
        </div>
      )}
      <div className="header__social-wrapper">
        <a href={'https://twitter.com/NeoFilmsNFT '}>
          <img src={x} alt="X" />
        </a>
        <a href={'https://discord.com/invite/brMNhjGdTndiscord'}>
          <img src={discord} alt="Discord" />
        </a>
      </div>
    </div>
  );
};

export default Header;
