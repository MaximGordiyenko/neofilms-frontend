import axios from 'axios';
import FormData from 'form-data';


// FormData:
// image: ${image}
// name: ${name}
// description: ${description}
// completion: ${completion}
export async function addProject(_formData) {
	const formData = new FormData();
	for (const key in _formData) {
		formData.append(key, _formData[key]);
	}
	
	return await axios.post(`/api/pages/project`, formData, {
			withCredentials: true
		});
}

export async function getProject(projectId) {
	return await axios.get(`/api/pages/project/${projectId}`, {
			withCredentials: true
		});
}

// FormData:
// image: ${image}
// name: ${name}
// description: ${description}
// completion: ${completion}
export async function editProject(projectId, _formData) {
	const formData = new FormData();
	for (const key in _formData) {
		formData.append(key, _formData[key]);
	}
	
	return await axios.post(`/api/pages/project/${projectId}`, formData, {
			withCredentials: true
		});
}

export async function deleteProject(projectId) {
	return await axios.delete(`/api/pages/project/${projectId}`, {
			withCredentials: true
		});
}

export async function getProjects() {
	return await axios.get(`/api/pages/projects`, {
			withCredentials: true
		});
}

export function getImage(projectId) {
	return `/api/pages/project/${projectId}/image`;
}