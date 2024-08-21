import { FooterCreds } from '../../../components/credsFooter/FooterCreds';
import { HeaderRedeem } from './header/HeaderRedeem';
import { BodyRedeem } from './body/BodyRedeem';

const Redeem = () => {
  return (
    <>
      <HeaderRedeem />
      <BodyRedeem />
      <FooterCreds />
    </>
  );
};

export default Redeem;
