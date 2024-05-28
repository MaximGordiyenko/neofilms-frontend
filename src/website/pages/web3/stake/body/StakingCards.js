import { STAKING_CARDS } from '../../../../constants/web3';
import { Button } from '../../../../components/button/Button';
import { FilledButton } from '../../../../components/button/FilledButton';
import { MobButton } from '../../../../components/button/MobButton';

export const StakingCards = () => {
  return (
    <div className={'card-container'}>
      {STAKING_CARDS.map((card, i) => {
        return (
          <div className={'card-box'} key={i}>
            <div className={'card-title'}>
              <span>Staking</span>
              <span>{card.type}</span>
            </div>
            <img src={card.img} alt={'card-img-staking'} />
            <div className={'stat-box'}>
              <div>
                <p>Eligible NFTs to stake</p>
                <span>{card.nft_to_stake}</span>
              </div>
              <div>
                <p>Total NFTs Currently Staked</p>
                <span>{card.curr_staked}</span>
              </div>
              <div>
                <p>NEOBux Estimated / Per Day</p>
                <span>{card.estimated}</span>
              </div>
            </div>
            <div className={'unclaimed-box'}>
              <span>Unclaimed</span>
              <p>{card.unclaimed} NEObux</p>
            </div>
            <div className={'btn-box-staking'}>
              <MobButton btnText={'claim neobux'} />
              <Button text={'claim'} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
