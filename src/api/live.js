import axios from 'axios';



export function auth() {
	return `/api/live/auth`;
}

export function callback() {
	return `/api/live/callback`;
}

export async function status() {
	return await axios.get(`/api/live/status`, {
			withCredentials: true
		});
}

export async function check() {
	return await axios.get(`/api/live/check`, {
			withCredentials: true
		});
}

export async function info() {
	return await axios.get(`/api/live/info`, {
			withCredentials: true
		});
}