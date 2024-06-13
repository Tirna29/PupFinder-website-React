import axios from 'axios';

const api = axios.create({
  baseURL: 'https://frontend-take-home-service.fetch.com',
  withCredentials: true
});

export const login = (name, email) => api.post('/auth/login', { name, email });
export const fetchBreeds = () => api.get('/dogs/breeds');
export const searchDogs = (params) => api.get('/dogs/search', { params });
export const fetchDogs = (ids) => api.post('/dogs', ids);
export const matchDogs = (ids) => api.post('/dogs/match', ids);

export default api;