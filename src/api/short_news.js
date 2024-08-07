import axios from 'axios';
import FormData from 'form-data';


export async function addShortNews(image, description, date) {
	const formData = new FormData();
	formData.append('image', image);
	formData.append('description', description);
	formData.append('date', date);
	
	return await axios.post(`/api/pages/short_news`, formData, {
			withCredentials: true
		});
}

export async function editShortNews(shortNewsId, image, description, date) {
	const formData = new FormData();
	formData.append('image', image);
	formData.append('description', description);
	formData.append('date', date);
	
	return await axios.post(`/api/pages/short_news/${shortNewsId}`, formData, {
			withCredentials: true
		});
}

export async function deleteShortNews(shortNewsId) {
	return await axios.delete(`/api/pages/short_news/${shortNewsId}`, {
			withCredentials: true
		});
}

export async function getShortNewsList() {
	return await axios.get(`/api/pages/short_news`, {
			withCredentials: true
		});
}

export async function getShortNews(shortNewsId) {
	return await axios.get(`/api/pages/short_news/${shortNewsId}`, {
			withCredentials: true
		});
}

export async function getShortNewsImage(shortNewsId) {
	return await axios.get(`/api/pages/short_news/${shortNewsId}/image`, {
		responseType: 'blob',
		withCredentials: true
	});
}
