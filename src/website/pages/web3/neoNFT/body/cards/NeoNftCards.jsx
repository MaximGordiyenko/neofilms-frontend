import './style.scss';
import { NFT_CARDS } from '../../../../../constants/web3';
import ProgressBar from '../../../../../components/progressbar/Progressbar';
export const NeoNftCards = () => {
  return (
    <div className={'cards-nft'}>
      {NFT_CARDS.map((item, i) => {
        return (
          <div className={'card-nft'} key={i}>
            <div className={'card-inner-content'}>
              <img src={item.img} align={`${item.img}`} className={'image-nft-card'} />
              <h4>{item.title}</h4>
              <p>{item.text}</p>
              <ProgressBar progress={item.progress} />
            </div>
            <div className={'pg-bar-points'}>
              <span>pre-prod</span>
              <span>production</span>
              <span>release</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
