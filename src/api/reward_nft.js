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
	return (await axios.post(`/api/reward/mint/${poolId}`, {
			address: address,
			amount: amount,
		}, {
			withCredentials: true
		})).txHash;
}

export async function update(poolId, baseUri, treasury, price) {
	return await axios.post(`/api/reward/update/${poolId}`, {
			base_uri: baseUri,
			treasury: treasury,
			price: price,
		}, {
			withCredentials: true
		});
}