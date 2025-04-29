type UserInformation = {
  name: string;
  roomNum: string;
  birth: string;
  yearOfAdmission: string;
  password: string;
};

function validateUser(values: UserInformation) {
  const errors = {
    name: '',
    password: '',
    roomNum: '',
    birth: '',
    yearOfAdmission: '',
  };

  if (!values.name.trim()) {
    errors.name = '이름은 필수입니다.';
  }

  if (!(values.password.length > 7 && values.password.length < 21)) {
    errors.password = '비밀번호는 8 ~ 20자 사이로 입력해주세요.';
  }

  if (!/^\d+$/.test(values.roomNum)) {
    errors.roomNum = '방번호는 숫자만 입력 가능합니다.';
  }

  if (values.roomNum.length < 1 || values.roomNum.length > 3) {
    errors.roomNum = '방번호는 1 ~ 3자리 숫자여야 합니다.';
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(values.birth)) {
    errors.birth = '생년월일은 YYYY-MM-DD 형식으로 입력해주세요.';
  }

  if (!/^\d{4}$/.test(values.yearOfAdmission)) {
    errors.yearOfAdmission = '입학년도는 4자리 숫자로 입력해주세요.';
  }

  return errors;
}

function validateLogin(values: UserInformation) {
  return validateUser(values);
}

function validateSignup(values: UserInformation & {passwordConfirm: string}) {
  const errors = validateUser(values);
  const signupErrors = {...errors, passwordConfirm: ''};

  if (values.password !== values.passwordConfirm) {
    signupErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
  }

  return signupErrors;
}

function validateAddPost(values: {title: string}) {
  const errors = {
    title: '',
    description: '',
  };

  if (values.title.trim() === '') {
    errors.title = '제목은 1 ~ 30자 이내로 입력해주세요.';
  }

  return errors;
}

export {validateLogin, validateSignup, validateAddPost};
