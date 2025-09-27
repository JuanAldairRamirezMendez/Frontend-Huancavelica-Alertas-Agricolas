import axios from 'axios';
import { FormData } from '../types/form';

// const API_URL = import.meta.env.VITE_ALERT_API_URL || 'http://localhost:8000/api';

// export const registerFarmer = async (data: FormData) => {
//   return axios.post(`${API_URL}/farmers`, data);
// };

// export const getAlerts = async () => {
//   return axios.get(`${API_URL}/alerts`);
// };

// MOCK para frontend sin backend:
export const registerFarmer = async (data: FormData) => {
  return new Promise((resolve) => setTimeout(() => resolve({ data: { success: true } }), 500));
};

export const getAlerts = async () => {
  return new Promise((resolve) => setTimeout(() => resolve({ data: [] }), 500));
};
