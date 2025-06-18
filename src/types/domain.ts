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

export type {ImageUri, Post, Profile};
