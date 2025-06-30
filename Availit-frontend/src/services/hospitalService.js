import axios from 'axios';

const API_URL = 'http://localhost:8080/api/hospitals';

// Set up axios interceptor to attach JWT
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getAllHospitals = (params) =>
  axios.get(`${API_URL}/getAllHospitals`, { params });

export const createHospital = (hospitalData) =>
  axios.post(API_URL, hospitalData);

export const updateHospital = (id, hospitalData) =>
  axios.put(`${API_URL}/${id}`, hospitalData);

export const deleteHospital = (id) =>
  axios.delete(`${API_URL}/${id}`);

export function getAllHospitalsPublic() {
  return fetch(`${API_URL}/public/hospitals`).then(res => res.json());
}

export function getHospitalsByCity(city) {
  return fetch(`${API_URL}/city/${encodeURIComponent(city)}`)
    .then(res => res.json());
}

export function getUserCity(username) {
  return fetch(`http://localhost:8080/api/auth/city/${encodeURIComponent(username)}`)
    .then(res => res.json());
}

export function updateUserCity(username, city) {
  return fetch(`http://localhost:8080/api/auth/city/${encodeURIComponent(username)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ city })
  }).then(res => res.json());
}

export function getAllCities() {
  return fetch(`${API_URL}/cities`).then(res => res.json());
}

export function getDelhiHospitalsLive() {
  return fetch('http://localhost:4001/api/delhi-hospitals').then(res => res.json());
} 