import { FooterCreds } from '../../../components/credsFooter/FooterCreds';
import { HeaderRedeem } from './header/HeaderRedeem';
import { BodyRedeem } from './body/BodyRedeem';

export const Redeem = () => {
  return (
    <>
      <HeaderRedeem />
      <BodyRedeem />
      <FooterCreds />
    </>
  );
};
