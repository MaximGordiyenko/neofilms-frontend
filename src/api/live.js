import axios from 'axios';


export async function check() {
	return await axios.get(`/api/live/check`, {
			withCredentials: true
		});
}

export async function status() {
	return await axios.get(`/api/live/status`, {
			withCredentials: true
		});
}