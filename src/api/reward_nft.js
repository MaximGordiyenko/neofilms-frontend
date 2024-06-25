import axios from 'axios';


export async function approveNeoBux(poolId) {
	return await axios.get(`/api/reward/approve/${poolId}`, {
			withCredentials: true
		});
}

export async function purchase(poolId) {
	return await axios.get(`/api/reward/purchase/${poolId}`, {
			withCredentials: true
		});
}

export async function mint(poolId, address, amount) {
	return await axios.post(`/api/reward/mint/${poolId}`, {
			address: address,
			amount: amount,
		}, {
			withCredentials: true
		});
}

export async function update(poolId, address, amount) {
	return await axios.post(`/api/reward/update/${poolId}`, {
			address: address,
			amount: amount,
		}, {
			withCredentials: true
		});
}