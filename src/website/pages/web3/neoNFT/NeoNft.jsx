import { FooterCreds } from '../../../components/credsFooter/FooterCreds';
import { HeaderNeo } from './header/HeaderNeo';
import { BodyNeo } from './body/BodyNeo';
export const NeoNft = () => {
  return (
    <div className={'neo-nft-wrapper'}>
      <HeaderNeo />
      <BodyNeo />
      <FooterCreds />
    </div>
  );
};
