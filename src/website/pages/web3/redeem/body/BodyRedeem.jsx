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
import { runTransaction, waitTransactionReceipt } from '../../../../../utils/MetaMask';

export const BodyRedeem = ({ authCount }) => {
  const isMobile = window.innerWidth <= 430;
  const [approve, setApprove] = useState(null);
  const [eligablePasses, setEligablePasses] = useState([]);

  useEffect(() => {
    updateEligiblePasses();
  }, [authCount]);

  const updateEligiblePasses = async () => {
    try {
      const eligible_passes = (await rewardNftApi.getEligiblePasses()).data;
      setApprove(eligible_passes.approve);
      setEligablePasses(eligible_passes.passes);
      console.log("eligible passes:", eligible_passes);
    } catch (error) {
      console.error("Failed to fetch eligible passes:", error);
    }
  };

  const claim = async () => {
    try {
      if (approve) {
        console.log("approve tx:", approve);
        await waitTransactionReceipt(await runTransaction(approve));
      }
      for (let eligiblePass of eligablePasses) {
        if (eligiblePass.purchase_tx) {
          console.log("purchase tx:", eligiblePass.purchase_tx);
          await waitTransactionReceipt(await runTransaction(eligiblePass.purchase_tx));
        }
      }
    } catch (error) {
      console.error("Failed to claim promotion:", error);
    }
    await updateEligiblePasses();
  };

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
              disabled={!eligablePasses.length}
            /> : <Button
              isGlitch
              text={'claim'}
              onClick={claim}
              disabled={!eligablePasses.length}
            />}
          </div>
        </div>
        <img src={coin} alt={'redeem-coin'} className={'coin'}/>
        <img src={isMobile ? mobileLine : bottomLine} alt={'bottom-redeem'} className={'bottom-redeem-line'}/>
      </div>
    </div>
  );
};
