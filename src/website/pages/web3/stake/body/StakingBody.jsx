import './style.scss';
import { StakingCards } from './StakingCards';
import bottomLine from '../../../../assets/images/footer-hp-placeholder.svg';
import mobileLine from '../../../../assets/images/cast-footer-geometry.png';
import {useMediaQuery} from "@mui/material";
export const StakingBody = ({ authCount }) => {
  const isMobile = useMediaQuery('(max-width: 430px)');
  return (
    <div className={'staking-body-wrapper'}>
      <StakingCards authCount={authCount} />
      <img src={isMobile ? mobileLine : bottomLine} alt={'bottom-line'} className={'bottomLine'} />
    </div>
  );
};
