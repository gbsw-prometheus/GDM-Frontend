import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://10.0.2.2:3030',
  //baseURL: 'http://localhost:3030',
  baseURL: 'https://2025-313-server-alb-2038302199.ap-northeast-2.elb.amazonaws.com',
  withCredentials: true,
});

export default axiosInstance;