import './style.scss';
import { useState, useEffect } from 'react';
import bottomLine from '../../../../assets/images/footer-hp-placeholder.svg';
import coin from '../../../../assets/images/coin.svg';
import CustomDropdown from '../../../../components/dropdown/CustomDropdown';
import { Button } from '../../../../components/button/Button';
import dots from '../../../../assets/images/thripleDots.svg';
import { MobButton } from '../../../../components/button/MobButton';
import mobileLine from '../../../../assets/images/cast-footer-geometry.png';
import * as rewardNftApi from '../../../../../api/reward_nft';
import { a } from 'react-spring';
import { runTransaction } from '../../../../../utils/MetaMask';

export const BodyRedeem = () => {
  const isMobile = window.innerWidth <= 430;
  const [isEligible, setIsEligible] = useState(false);
  const [approveTx, setApproveTx] = useState(null);
  const [claimTx, setClaimTx] = useState(null);

  useEffect(() => {
    (async () => {
      const eligible_passes = (await rewardNftApi.getEligiblePasses()).data;
      setIsEligible(eligible_passes.eligible);
      setApproveTx(eligible_passes.approve_tx);
      setClaimTx(eligible_passes.purchase_tx);
    })()
  }, []);
  
  const approve = async () => {
    if (approveTx === null) {
      return;
    }
    await runTransaction(approveTx);
  };

  const claim = async () => {
    await approve();
    if (claimTx === null) {
      return;
    }
    await runTransaction(claimTx);
  }

  const options = [
    { value: '150-250k', label: '150-250k' },
    { value: '250-500k', label: '250-500k' },
    { value: '500+k', label: '500+k' },
  ];
  return (
    <div className={'redeem-body-wrapper'}>
      <div className="content-box-redeem">
        <div className={'form-box-redeem'}>
          <h4>Turn Your NEOBux Into IRL Rewards</h4>
          <p>
            Use your NEOBux tokens to receive discounts and special promotions from the NMF network.
            Choose a promotion, select claim, head to the Coupon page to see your codes. Please note
            that claiming promotions can take up to 20 seconds.
          </p>
          <div className={'form-btn-box'}>
            <img src={dots} alt={'redeem-dots'}/>
            <div className={'hr'}/>
            {isMobile ? <MobButton
              btnText={'claim'}
              onClick={claim}
              disabled={!isEligible}
            /> : <Button
              text={'claim'}
              onClick={claim}
              disabled={!isEligible}
            />}
          </div>
        </div>
        <img src={coin} alt={'redeem-coin'} className={'coin'}/>
        <img src={isMobile ? mobileLine : bottomLine} alt={'bottom-redeem'} className={'bottom-redeem-line'}/>
      </div>
    </div>
  );
};
