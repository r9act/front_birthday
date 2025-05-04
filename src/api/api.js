import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL
});
/**
 * перехватчик для добавления хедера с токеном (для сессии Spring Security)
 */
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const createUser = (userData) => instance.post(`/api/users`, userData);
export const getUserByForeignId = (foreignId) => instance.get(`/api/users/${foreignId}`);
// export const updateUser = (userData) => axios.put(`${API_BASE_URL}/api/users/${userData.id}`, userData);
export const saveUserBirthdays = (foreignId, birthdays) => instance.post(`/api/birthdays/${foreignId}`, birthdays);
// export const getUserBirthdays = (foreignId) => axios.get(`${API_BASE_URL}/api/birthdays/${foreignId}`);
export const getUserBirthdays = (foreignId) => instance.get(`/api/birthdays/${foreignId}`);