import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const createUser = (userData) => axios.post(`${API_BASE_URL}/api/users`, userData);
export const getUserByForeignId = (foreignId) => axios.get(`${API_BASE_URL}/api/users/${foreignId}`);
// export const updateUser = (userData) => axios.put(`${API_BASE_URL}/api/users/${userData.id}`, userData);
export const saveUserBirthdays = (foreignId, birthdays) => axios.post(`${API_BASE_URL}/api/birthdays/${foreignId}`, birthdays);
export const getUserBirthdays = (foreignId) => axios.get(`${API_BASE_URL}/api/birthdays/${foreignId}`);