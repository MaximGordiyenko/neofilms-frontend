import axios from 'axios';


export async function getPools() {
	return await axios.get(`/api/staking/pools`, {
			withCredentials: true
		});
}

export async function getPool(poolId) {
	return await axios.get(`/api/staking/pool/${poolId}`, {
			withCredentials: true
		});
}

// Body: {
//     "nft_address": "{{pool_nft_address}}",
//     "time_unit": {{pool_time_unit}},
//     "rewards_per_time_unit": "{{pool_rewards_per_time_unit}}",
//     "max_staking_period": {{pool_max_staking_period}}
// }
export async function addPool(body) {
	return (await axios.post(`/api/staking/pool`, body, {
			withCredentials: true
		})).txHash;
}

export async function updatePool(poolId, timeUnit, rewardsPerTimeUnit, maxStakingPeriod) {
	return (await axios.post(`/api/staking/pool/${poolId}`, {
			time_unit: timeUnit,
			rewards_per_time_unit: rewardsPerTimeUnit,
			max_staking_period: maxStakingPeriod,
		}, {
			withCredentials: true
		})).txHash;
}

export async function getStakingList() {
	return await axios.get(`/api/staking/list`, {
			withCredentials: true
		});
}

export async function approveNft(poolId, tokenId) {
	return await axios.post(`/api/staking/approve/${poolId}`, {
			token_id: tokenId,
		}, {
			withCredentials: true
		});
}

export async function stake(poolId, tokenIds) {
	return await axios.post(`/api/staking/stake/${poolId}`, {
			token_ids: tokenIds,
		}, {
			withCredentials: true
		});
}

export async function unstake(poolId, tokenIds) {
	return await axios.post(`/api/staking/stake/${poolId}`, {
			token_ids: tokenIds,
		}, {
			withCredentials: true
		});
}

export async function claimRewards(poolId) {
	return await axios.get(`/api/staking/claim/${poolId}`, {
			withCredentials: true
		});
}

export async function availableRewards(poolId) {
	return await axios.get(`/api/staking/rewards/${poolId}`, {
			withCredentials: true
		});
}