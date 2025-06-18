import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://d3qgsjthap533f.cloudfront.net',
  // 'https://2025-313-server-alb-2038302199.ap-northeast-2.elb.amazonaws.com',
  withCredentials: true,
});

export default axiosInstance;
