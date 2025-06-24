const authNavigations = {
  AUTH_HOME: 'AuthHome',
  LOGIN: 'Login',
  SIGNUP: 'Signup',
} as const;

const statusNavigations = {
  STATUS_HOME: 'StatusHome',
  STATUS_DETAIL: 'StatusDetail',
  GOING_DETAIL: 'GoingDetail',
} as const;

const mainNavigations = {
  STATUS_HOME: 'StatusHome',
  HOME: 'Home',
  NOTICE_HOME: 'NoticeHome',
  PROFILE_HOME: 'ProfileHome',
  ATTENDANCE: 'Attendance',
  OUTING: 'Outing',
} as const;

const mainTabNavigations = {
  STATUS_HOME: 'StatusHome',
  HOME: 'Home',
  NOTICE_HOME: 'NoticeHome',
  PROFILE_HOME: 'ProfileHome',
  ATTENDANCE: 'Attendance',
  OUTING_HOME: 'OutingHome',
} as const;

export {
  authNavigations,
  mainNavigations,
  mainTabNavigations,
  statusNavigations,
};
