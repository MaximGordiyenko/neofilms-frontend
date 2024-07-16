import './style.scss';
import lowerLine from '../../../../assets/images/down_block-placeholder.svg';
import mobileLine from '../../../../assets/images/cast-footer-geometry.png'
import { NeoNftCards } from './cards/NeoNftCards';

export const BodyNeo = () => {
  const isMobile = window.innerWidth <= 430;
  return (
    <div className={'body-neo-wrapper'}>
      <div className={'neo-body-title'}>
        <h4>New and Upcoming Projects</h4>
      </div>
      <NeoNftCards />
      <img src={isMobile ? mobileLine : lowerLine} alt={'bot-line'} className={'bot-line'} />
    </div>
  );
};
