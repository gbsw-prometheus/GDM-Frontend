import axiosInstance from './axios';

// 결석자 데이터 타입
export type AbsenceData = {
  id: string;
  name: string;
  grade: number;
  class: number;
  number: number;
  userId: number;
  status: string;
};

// 외출/외박 데이터 타입
export type OutsideData = {
  id: string;
  name: string;
  type: string; // '외출중' | '외박중'
  time: string; // 시간 정보
  userId: number;
  outDateTime: string;
  inDateTime: string;
  title: string;
  content: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
};

// 외출/외박 신청 요청 타입
export type GoingRegistrationRequest = {
  userId: number;
  outDateTime: string; // "2025-06-20"
  inDateTime: string; // "2025-06-20"
  title: string;
  content: string;
};

// 결석자 리스트 조회
export const getAbsenceList = async (): Promise<AbsenceData[]> => {
  const {data} = await axiosInstance.get('/api/attendance/no-attendance');
  return data;
};

// 외출/외박 리스트 조회
export const getGoingList = async (): Promise<OutsideData[]> => {
  const {data} = await axiosInstance.get('/api/going/list');
  return data;
};

// 외출/외박 상세 조회
export const getGoingDetail = async (id: string): Promise<OutsideData> => {
  const {data} = await axiosInstance.get(`/api/going/${id}`);
  return data;
};

// 외출/외박 신청
export const postGoingRegistration = async (
  body: GoingRegistrationRequest,
): Promise<void> => {
  const {data} = await axiosInstance.post('/api/going/registration', body);
  return data;
};

// 외출/외박 신청 수락
export const postGoingAccept = async (id: string): Promise<void> => {
  const {data} = await axiosInstance.post(`/api/going/accept/${id}`);
  return data;
};

// 외출/외박 신청 취소
export const deleteGoing = async (id: string): Promise<void> => {
  const {data} = await axiosInstance.delete(`/api/going/delete/${id}`);
  return data;
};
