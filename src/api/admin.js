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