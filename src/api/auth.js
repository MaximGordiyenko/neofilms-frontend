import axios from 'axios';


export async function getData(address) {
	return await axios.get(`/api/auth/data?address=${address}`, {
			withCredentials: true
		});
}

export async function login(address, sign) {
	return await axios.post(`/api/auth/login`, {
			address: address,
			sign: sign,
		}, {
			withCredentials: true
		});
}

export async function check() {
	return await axios.get(`/api/auth/check`, {
			withCredentials: true
		});
}