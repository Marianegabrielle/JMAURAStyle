import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
};

export const clothingAPI = {
  getAll: () => API.get('/clothes/'),
  add: (formData) => API.post('/clothes/', formData),
  update: (id, data) => API.patch(`/clothes/${id}`, data),
  delete: (id) => API.delete(`/clothes/${id}`),
};

export const outfitAPI = {
  generate: (event_type) => API.post('/outfits/generate', { event_type }),
  getHistory: () => API.get('/outfits/history'),
  createManual: (data) => API.post('/outfits/manual', data),
};

export const weatherAPI = {
  get: () => API.get('/weather/'),
};

export const profileAPI = {
  get: () => API.get('/profile/'),
  update: (data) => API.patch('/profile/', data),
  updatePhoto: (formData) => API.post('/profile/photo', formData),
};

export default API;
