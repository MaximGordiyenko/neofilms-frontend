import webArrow from '../../assets/images/navbar-arr.svg';
import house from '../../assets/images/fNew.png';
import peoples from '../../assets/images/newssec.png';
import GlitchEffect from '../../components/glitch/GlitchComponent';
import newfMobile from '../../assets/images/mobilefnew.png';
import newSecMobile from '../../assets/images/mobileSnew.png';

export const NAVBAR_TABS = [
  {
    title: 'home',
    path: '/',
  },
  {
    title: 'live',
    path: '/live',
    mark: 'soon',
  },
  {
    title: 'about',
    path: '/about',
  },
  {
    title: 'casting',
    path: '/casting',
    openInNewTab: true,
  },
  {
    title: 'news',
    path: '/news',
  },
  {
    title: 'shop',
    path: '/product',
  },
  {
    title: 'services',
    path: '/services',
  },
  {
    title: 'web3',
    icon: webArrow,
    dropdown: [
      { title: 'NEO NFTs', path: '/web3/neo-nft', inside_page: true },
      { title: 'STAKE', path: '/web3/stake', inside_page: true },
      { title: 'REDEEM', path: '/web3/redeem', inside_page: true },
      { title: 'REKT', path: 'https://rekt-robots.theneofund.com/', inside_page: false, external: true },
    ],
  },
  {
    title: 'contacts',
    path: '/contacts',
  },
];

