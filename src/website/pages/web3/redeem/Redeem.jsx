import { useState } from 'react';
import { FooterCreds } from '../../../components/credsFooter/FooterCreds';
import { HeaderRedeem } from './header/HeaderRedeem';
import { BodyRedeem } from './body/BodyRedeem';

const Redeem = () => {
  const [authCount, setAuthCount] = useState(0);

  const onLogin = () => {
    setAuthCount(authCount + 1);
  };

  return (
    <>
      <HeaderRedeem onLogin={onLogin} />
      <BodyRedeem authCount={authCount} />
      <FooterCreds />
    </>
  );
};

export default Redeem;
