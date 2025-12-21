

import axios from 'axios';

// Fix: Base URL 
const API = axios.create({ 
   baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000'
 // baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000'

});

// response interceptors for debugging
API.interceptors.request.use(
  (config) => {
    console.log(' Making API request:', config.method?.toUpperCase(), config.url);
    console.log(' Request data:', config.data);
    return config;
  },
  (error) => {
    console.error(' Request error:', error);
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    console.log(' API response:', response.status, response.config.url);
    console.log(' Response data:', response.data);
    return response;
  },
  (error) => {
    console.error(' Response error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

// Quiz API endpoints
export const createQuiz = (quizData) => API.post('/api/quiz/create', quizData);
export const getQuiz = (id) => API.get(`/api/quiz/${id}`);
export const getQuizzes = () => API.get('/api/quiz');
export const startQuiz = (id) => API.patch(`/api/quiz/start/${id}`);
export const joinQuiz = (roomCode) => API.post('/api/quiz/join', { roomCode });
export const submitAnswer = (data) => API.post('/api/quiz/submit', data);
export const getResults = (quizId) => API.get(`/api/quiz/results/${quizId}`);

export default API;