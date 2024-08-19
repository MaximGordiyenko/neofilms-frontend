import axios from 'axios';


export async function balanceOf(address) {
	return await axios.get(`/api/neobux/balance/${address}`, {
			withCredentials: true
		});
}