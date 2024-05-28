import './style.scss';
import { StakingCards } from './StakingCards';
import bottomLine from '../../../../assets/images/footer-hp-placeholder.svg';
export const StakingBody = () => {
  return (
    <div className={'staking-body-wrapper'}>
      <StakingCards />
      <img src={bottomLine} alt={'bottom-line'} className={'bottomLine'} />
    </div>
  );
};
