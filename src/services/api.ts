import axios from 'axios';

const api = axios.create({
  baseURL: 'http://157.245.87.195',

  // baseURL: 'http://localhost:1337',
});

export default api;
