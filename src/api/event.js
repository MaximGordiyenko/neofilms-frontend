import axios from 'axios';


export async function addEvent(name, date, description) {
	return await axios.post(`/api/pages/event`, {
			name: name,
			date: date,
			description: description,
		}, {
			withCredentials: true
		});
}

export async function getEvent(eventId) {
	return await axios.get(`/api/pages/event/${eventId}`, {
			withCredentials: true
		});
}

export async function editEvent(eventId, name, date, description) {
	return await axios.post(`/api/pages/event/${eventId}`, {
			name: name,
			date: date,
			description: description,
		}, {
			withCredentials: true
		});
}

export async function deleteEvent(eventId) {
	return await axios.delete(`/api/pages/event/${eventId}`, {
			withCredentials: true
		});
}

export async function getEvents() {
	return await axios.get(`/api/pages/events`, {
			withCredentials: true
		});
}