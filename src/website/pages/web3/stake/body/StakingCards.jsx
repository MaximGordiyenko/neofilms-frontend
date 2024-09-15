import React, { useState, useEffect } from 'react';
import { STAKING_CARDS } from '../../../../constants/web3';
import { Button } from '../../../../components/button/Button';
import { MobButton } from '../../../../components/button/MobButton';
import * as stakingApi from '../../../../../api/staking';
import * as authApi from '../../../../../api/auth';
import { runTransaction } from '../../../../../utils/MetaMask';

export const StakingCards = ({ authCount }) => {
  const [pools, setPools] = useState([]);
  const [stakingList, setStaking] = useState([]);

  const updateStakingData = async () => {
    const pools = (await stakingApi.getPools()).data;
    for (let i = 0; i < pools.length; i++) {
      pools[i].total_staked = 0;
      pools[i].nft_to_stake = [];
      pools[i].unclaimed = "0";
      pools[i].img = stakingApi.getPoolImage(pools[i].id);
    }
    setPools([...pools]);

    for (let i = 0; i < pools.length; i++) {
      const pool = { ...pools[i] };
      pools[i] = pool;
      pool.total_staked = (await stakingApi.getPoolInfo(pool.id)).data.totalStaked;
    }
    setPools([...pools]);

    try {
      if ((await authApi.check()).data) {
        for (let i = 0; i < pools.length; i++) {
          const pool = { ...pools[i] };
          pools[i] = pool;
          pool.nft_to_stake = (await stakingApi.getTokens(pool.id)).data;
          try {
            pool.unclaimed = await stakingApi.availableRewards(pool.id);
          } catch (e) {
            console.error(e);
          }
        }
        setPools([...pools]);

        setStaking((await stakingApi.getStakingList()).data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    updateStakingData();
  }, [authCount]);

  const approveAll = async (pool) => {
    if (pool.nft_to_stake.length === 0) {
      return;
    }
    const data = (await stakingApi.approveAll(pool.id)).data;
    if (data && typeof data === 'object') {
      console.log("approve all tx:", data);
      await runTransaction(data);
      await updateStakingData();
    }
  };

  const stake = async (pool) => {
    if (pool.nft_to_stake.length === 0) {
      return;
    }
    const tx = (await stakingApi.stake(pool.id, pool.nft_to_stake)).data;
    console.log("stake tx:", tx);
    await runTransaction(tx);
    await updateStakingData();
  };

  const unstake = async (pool) => {
    const staking = stakingList.find((s) => s.pool_id === pool.id);
    if (!staking) {
      console.error("staking not found for pool:", pool);
      return;
    }
    const tx = (await stakingApi.unstake(pool.id, staking.token_ids)).data;
    console.log("unstake tx:", tx);
    await runTransaction(tx);
    await updateStakingData();
  };

  const claim = async (pool) => {
    const tx = (await stakingApi.claimRewards(pool.id)).data;
    console.log("claim tx:", tx);
    await runTransaction(tx);
    await updateStakingData();
  };

  return (
    <div className={'card-container'}>
      {pools.map((pool, i) => {
        return (
          <div className={'card-box'} key={i}>
            <div className={'card-title'}>
              <span>Staking</span>
              <span>{pool.type}</span>
            </div>
            <img src={pool.img} alt={'card-img-staking'} />
            <div className={'stat-box'}>
              <div>
                <p>Eligible NFTs to stake</p>
                <span>{pool.nft_to_stake.length}</span>
              </div>
              <div>
                <p>Total NFTs Currently Staked</p>
                <span>{pool.total_staked}</span>
              </div>
              <div>
                <p>NEOBux Estimated / Per Day</p>
                <span>{pool.rewards_per_unit_time}</span>
              </div>
            </div>
            <div className={'unclaimed-box'}>
              <span>Unclaimed</span>
              <p>{pool.unclaimed} NEOBux</p>
            </div>
            <div className={'btn-box-staking'}>
              <MobButton
                btnText={'claim neobux'}
                onClick={async () => {
                  await claim(pool);
                }}
                disabled={pool.unclaimed === "0.0" || pool.unclaimed === "0"}
              />
              <Button
                isGlitch
                text={'stake'}
                onClick={async () => {
                  await approveAll(pool);
                  await stake(pool);
                }}
              />
              <p
                className="unstake-btn"
                onClick={async () => {
                  await unstake(pool);
                }}
              >Unstake</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
