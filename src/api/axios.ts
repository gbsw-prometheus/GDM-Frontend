import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://d3qgsjthap533f.cloudfront.net',
  withCredentials: true,
});

export default axiosInstance;
