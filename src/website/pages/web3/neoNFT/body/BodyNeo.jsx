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
        <p>
          In blandit diam nibh eleifend venenatis sed felis. Sociis porta mauris nibh arcu nunc in
          sem sed faucibus. Posuere ultrices lorem in sit ut aenean aenean mattis sollicitudin.{' '}
        </p>
      </div>
      <NeoNftCards />
      <img src={isMobile ? mobileLine : lowerLine} alt={'bot-line'} className={'bot-line'} />
    </div>
  );
};
