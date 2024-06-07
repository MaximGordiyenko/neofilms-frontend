import './style.scss';
import bottomLine from '../../../../assets/images/footer-hp-placeholder.svg';
import coin from '../../../../assets/images/coin.svg';
import CustomDropdown from '../../../../components/dropdown/CustomDropdown';
import { Button } from '../../../../components/button/Button';
import dots from '../../../../assets/images/thripleDots.svg';
import { MobButton } from '../../../../components/button/MobButton';
export const BodyRedeem = () => {
  const isMobile = window.innerWidth <= 430;

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
          <CustomDropdown options={options} value={'$5 storewide for 5 NEOBux'}/>
          <div className={'form-btn-box'}>
            <img src={dots} alt={'redeem-dots'}/>
            <div className={'hr'}/>
            {isMobile ? <MobButton btnText={'claim'}/> : <Button text={'claim'}/>}
          </div>
          <a href={'#'} className={'coupons'}>
            my coupons
          </a>
        </div>
        <img src={coin} alt={'redeem-coin'} className={'coin'}/>
        <img src={bottomLine} alt={'bottom-redeem'} className={'bottom-redeem-line'}/>
      </div>
    </div>
  );
};
