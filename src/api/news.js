import axios from 'axios';


export async function getNews() {
	return await axios.get(`/api/pages/news`);
}
