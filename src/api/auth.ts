import { getEncryptStorage } from '../utils';
import axiosInstance from './axios';

type RequestUser = {
    name: string;
    password: string;
    roomNum?: number;
    birth?: string;
    yearOfAdmission?: number;
};

const postSignup = async ({name, password, roomNum, birth, yearOfAdmission}: RequestUser): Promise<void> => {
  const {data} = await axiosInstance.post('/auth/join', {
    name,
    password,
    roomNum,
    birth,
    yearOfAdmission,
  });

  return data;
};

type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

const postLogin = async ({
  name,
  password,
}: RequestUser): Promise<ResponseToken> => {
  const {data} = await axiosInstance.post('/auth/login', {
    name,
    password,
  });

  return data;
};

const getAccessToken = async (): Promise<ResponseToken> => {
  const refreshToken = await getEncryptStorage('refreshToken');
  const {data} = await axiosInstance.get('/auth/refresh', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  return data;
};

const logout = async () => {
  await axiosInstance.post('/auth/logout');
};

export {postSignup, postLogin, getAccessToken, logout};
export type {RequestUser, ResponseToken };