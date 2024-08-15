import './style.scss';
import neoLogo from '../../assets/images/neo_logo.svg';
import x from '../../assets/images/X.svg';
import discord from '../../assets/images/Discord.svg';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import { FaInstagram } from "react-icons/fa";

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
        <a href={'https://twitter.com/NeoFilmsNFT '} target="_blank" rel="noopener noreferrer">
          <img src={x} alt="X" />
        </a>
        <a href='https://discord.com/invite/brMNhjGdTndiscord' target="_blank" rel="noopener noreferrer">
          <img src={discord} alt="Discord" />
        </a>
        <a href="https://www.instagram.com/neofilmsnft/" target="_blank" rel="noopener noreferrer">
          <FaInstagram color="#FFF"/>
        </a>
      </div>
    </div>
  );
};

export default Header;
