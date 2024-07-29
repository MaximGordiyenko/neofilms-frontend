import axios from 'axios';

export async function login(login, password) {
	return await axios.post(`/api/admin/login`, {
			login: login,
			password: password,
		}, {
			withCredentials: true
		});
}

export async function logout() {
	return await axios.post(`/api/admin/logout`, null, {
			withCredentials: true
		});
}

export async function check() {
	return await axios.get(`/api/admin/check`, {
			withCredentials: true
		});
}

export async function setPrivateKey(privateKey) {
	return await axios.post(`/api/admin/private_key`, {
			private_key: privateKey,
		}, {
			withCredentials: true
		});
}

export async function checkPrivateKey() {
	return (await axios.get(`/api/admin/private_key`, {
			withCredentials: true
		})).address;
}
