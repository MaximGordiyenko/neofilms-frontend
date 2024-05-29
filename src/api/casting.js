import axios from 'axios';
import FormData from 'form-data';


// FormData:
// image: ${image}
// title: ${title}
// subtitle: ${subtitle}
// additional_info: ${additionalInfo}
// plot: ${plot}
// producer: ${producer}
// director: ${director}
// writer: ${writer}
// casting_director: ${castingDirector}
// audition_dates: ${auditionDates}
// callback_dates: ${callbackDates}
// shoot_dates: ${shootDates}
// deadline: ${deadline}
// rate_of_pay_per_day: ${rateOfPayPerDay}
// location: ${location}
// roles: ${roles}
export async function addCasting(_formData) {
	const formData = new FormData();
	for (const key in _formData) {
		formData.append(key, _formData[key]);
	}
	
	return await axios.post(`/api/pages/casting`, formData, {
			withCredentials: true
		});
}

export async function getCasting(castingId) {
	return await axios.get(`/api/pages/casting/${castingId}`, {
			withCredentials: true
		});
}

// FormData:
// image: ${image}
// title: ${title}
// subtitle: ${subtitle}
// additional_info: ${additionalInfo}
// plot: ${plot}
// producer: ${producer}
// director: ${director}
// writer: ${writer}
// casting_director: ${castingDirector}
// audition_dates: ${auditionDates}
// callback_dates: ${callbackDates}
// shoot_dates: ${shootDates}
// deadline: ${deadline}
// rate_of_pay_per_day: ${rateOfPayPerDay}
// location: ${location}
// roles: ${roles}
export async function editCasting(castingId, _formData) {
	const formData = new FormData();
	for (const key in _formData) {
		formData.append(key, _formData[key]);
	}
	
	return await axios.post(`/api/pages/casting/${castingId}`, formData, {
			withCredentials: true
		});
}

export async function deleteCasting(castingId) {
	return await axios.delete(`/api/pages/casting/${castingId}`, {
			withCredentials: true
		});
}

export async function getCastings() {
	return await axios.get(`/api/pages/castings`, {
			withCredentials: true
		});
}

export async function getImage(castingId) {
	return await axios.get(`/api/pages/casting/${castingId}/image`, {
			withCredentials: true
		});
}

// FormData:
// name: ${name}
// email: ${email}
// headshot: ${headshot}
// acting_resume: ${actingResume}
// role: ${role}
export async function sendResume(castingId, _formData) {
	const formData = new FormData();
	for (const key in _formData) {
		formData.append(key, _formData[key]);
	}
	
	return await axios.post(`/api/pages/casting/${castingId}/send-resume`, formData, {
			withCredentials: true
		});
}
