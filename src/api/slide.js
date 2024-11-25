import axios from 'axios';
import FormData from 'form-data';

// FormData:
// movie: ${movie}
// logo_media: ${logoMedia}
// logo_text: ${logoText}
// additional_text: ${additionalText}
// button_text: ${buttonText}
// button_link: ${buttonLink}

export async function addSlide(_formData) {
	const formData = new FormData();
	for (const key in _formData) {
		formData.append(key, _formData[key]);
	}

	return await axios.post(`/api/pages/slide`, formData, {
			withCredentials: true
		});
}

export async function getSlide(slideId) {
	return await axios.get(`/api/pages/slide/${slideId}`, {
			withCredentials: true
		});
}

// FormData:
// movie: ${movie}
// logo_media: ${logoMedia}
// logo_text: ${logoText}
// additional_text: ${additionalText}
// button_text: ${buttonText}
// button_link: ${buttonLink}
export async function editSlide(slideId, _formData) {
	const formData = new FormData();
	for (const key in _formData) {
		formData.append(key, _formData[key]);
	}

	return await axios.post(`/api/pages/slide/${slideId}`, formData, {
			withCredentials: true
		});
}

export async function deleteSlide(slideId) {
	return await axios.delete(`/api/pages/slide/${slideId}`, {
			withCredentials: true
		});
}

export async function getSlides() {
	return await axios.get(`/api/pages/slides`, {
			withCredentials: true
		});
}

export function getMedia(slideId) {
	return `/api/pages/slide/${slideId}/movie`;
}

export function getLogo(slideId) {
	return `/api/pages/slide/${slideId}/logo`;
}
