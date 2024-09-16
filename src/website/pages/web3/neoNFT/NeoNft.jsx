import { FooterCreds } from '../../../components/credsFooter/FooterCreds';
import { HeaderNeo } from './header/HeaderNeo';
import { BodyNeo } from './body/BodyNeo';

const NeoNft = () => {
  return (
    <div className={'neo-nft-wrapper'}>
      <HeaderNeo />
      <BodyNeo />
      <FooterCreds />
    </div>
  );
};

export default NeoNft;
