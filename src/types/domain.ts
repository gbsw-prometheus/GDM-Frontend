interface ImageUri {
  id?: number;
  uri: string;
}

interface Post {
  title: string;
  address: string;
  date: Date | string;
  description: string;
}

interface Profile {
  id: number;
  email: string;
  nickname: string | null;
  imageUri: string | null;
  kakaoImageUri: string | null;
  loginType: 'email' | 'kakao' | 'apple';
}

interface User {
  id: number;
  name: string;
  roomNum: number;
  role: 'TEACHER' | 'STUDENT';
  attendance: null | any;
  noAttendance: any[];
  goingApply: any[];
  birth: string;
  yearOfAdmission: string;
  isGraduate: boolean;
}

export type {ImageUri, Post, Profile, User};
