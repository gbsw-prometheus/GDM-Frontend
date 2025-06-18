import axiosInstance from './axios';

// 회원가입 요청 타입
export type SignupRequest = {
  name: string;
  password: string;
  roomNum: number;
  birth: string; // "YYYY/MM/DD"
  yearOfAdmission: number;
};

// 로그인 요청 타입
export type LoginRequest = {
  name: string;
  password: string;
  birth: string; // "YYYY/MM/DD"
};

// 회원가입
export const postSignup = async (body: SignupRequest): Promise<void> => {
  const {data} = await axiosInstance.post('/api/auth/join', body);

  return data;
};

// 로그인
export const postLogin = async ({
  name,
  password,
  birth,
}: LoginRequest): Promise<void> => {
  const {data} = await axiosInstance.post('/api/auth/login', {
    name,
    password,
    birth,
  });
  return data;
};

export const getProfile = async () => {
  const {data} = await axiosInstance.get('/api/auth/users');
  // 실제 프로필이 여러 명일 경우, 첫 번째 사용자만 반환하거나 원하는 방식으로 가공
  return data;
};
