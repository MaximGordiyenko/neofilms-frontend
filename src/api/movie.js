import axios from 'axios';
import FormData from 'form-data';

// FormData:
// poster: ${poster}
// title: ${title}
// description: ${description}
// movie_link: ${movieLink}
// release_date: ${releaseDate}
// status: ${status}
// directed_by: ${directedBy}
// written_by: ${writtenBy}
// starring: ${starring}
export async function addMovie(_formData) {
	const formData = new FormData();
	for (const key in _formData) {
		switch (key) {
			case 'directed_by':
			case 'written_by':
			case 'starring':
				formData.append(key, JSON.stringify(_formData[key]));
				break;
			default:
				formData.append(key, _formData[key]);
		}
	}
	
	return await axios.post(`/api/pages/movie`, formData, {
			withCredentials: true
		});
}

export async function getMovie(movieId) {
	return await axios.get(`/api/pages/movie/${movieId}`, {
			withCredentials: true
		});
}

// FormData:
// poster: ${poster}
// title: ${title}
// description: ${description}
// movie_link: ${movieLink}
// release_date: ${releaseDate}
// status: ${status}
// directed_by: ${directedBy}
// written_by: ${writtenBy}
// starring: ${starring}
export async function editMovie(movieId, _formData) {
	const formData = new FormData();
	for (const key in _formData) {
		switch (key) {
			case 'directed_by':
			case 'written_by':
			case 'starring':
				formData.append(key, JSON.stringify(_formData[key]));
				break;
			default:
				formData.append(key, _formData[key]);
		}
	}
	
	return await axios.post(`/api/pages/movie/${movieId}`, formData, {
			withCredentials: true
		});
}

export async function deleteMovie(movieId) {
	return await axios.delete(`/api/pages/movie/${movieId}`, {
			withCredentials: true
		});
}

export async function getMovies() {
	return await axios.get(`/api/pages/movies`, {
			withCredentials: true
		});
}

export function getPoster(movieId) {
	return `/api/pages/movie/${movieId}/poster`;
}


export function getHeaderImage(movieId) {
	return `/api/pages/movie/${movieId}/header_image`;
}
