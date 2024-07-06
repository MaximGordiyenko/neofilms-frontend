import axios from 'axios';
import FormData from 'form-data';


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

export function getPoolImage(poolId) {
	return `/api/staking/pool/${poolId}/image`;
}

export async function getPoolInfo(poolId) {
	return await axios.get(`/api/staking/pool/${poolId}/info`, {
			withCredentials: true
		});
}

// FormData:
// type: ${type}
// image: ${image}
// nft_address: ${nftAddress}
// time_unit: ${timeUnit}
// rewards_per_time_unit: ${rewardsPerTimeUnit}
// max_staking_period: ${maxStakingPeriod}
export async function addPool(_formData) {
	const formData = new FormData();
	for (const key in _formData) {
		formData.append(key, _formData[key]);
	}
	
	return (await axios.post(`/api/staking/pool`, formData, {
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

export async function getTokens(poolId) {
	return await axios.get(`/api/staking/tokens/${poolId}`, {
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

export async function approveAll(poolId) {
	return await axios.get(`/api/staking/approve-all/${poolId}`, {
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
	return await axios.post(`/api/staking/unstake/${poolId}`, {
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
	return (await axios.get(`/api/staking/rewards/${poolId}`, {
			withCredentials: true
		})).data.amount;
}