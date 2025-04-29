import React, {useRef} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import InputField from '../../components/common/InputField';
import CustomButton from '../../components/common/CustomButton';
import {validateSignup} from '../../utils';
import useForm from '../../hooks/useForm';

function SignupScreen() {
  const passwordRef = useRef<TextInput | null>(null);
  const passwordConfirmRef = useRef<TextInput | null>(null);
  const signup = useForm({
    initialValue: {
      name: '',
      roomNum: '',
      birth: '',
      yearOfAdmission: '',
      password: '',
      passwordConfirm: '',
    },
    validate: validateSignup,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <Image
            resizeMode="contain"
            style={styles.logo}
            source={require('../../assets/green-logo.png')}
          />
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <InputField
              autoFocus
              placeholder="이름"
              error={signup.errors.name}
              touched={signup.touched.name}
              inputMode="text"
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => passwordRef.current?.focus()}
            />
          </View>

          <View style={styles.inputContainer}>
            <InputField
              autoFocus
              placeholder="방번호"
              error={signup.errors.roomNum}
              touched={signup.touched.roomNum}
              inputMode="numeric"
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => passwordRef.current?.focus()}
            />
          </View>

          <View style={styles.inputContainer}>
            <InputField
              autoFocus
              placeholder="생년월일"
              error={signup.errors.birth}
              touched={signup.touched.birth}
              inputMode="text"
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => passwordRef.current?.focus()}
            />
          </View>

          <View style={styles.inputContainer}>
            <InputField
              autoFocus
              placeholder="입학년도"
              error={signup.errors.yearOfAdmission}
              touched={signup.touched.yearOfAdmission}
              inputMode="text"
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => passwordRef.current?.focus()}
            />
          </View>

          <View style={styles.inputContainer}>
            {' '}
            <InputField
              ref={passwordRef}
              placeholder="비밀번호"
              textContentType="oneTimeCode"
              error={signup.errors.password}
              touched={signup.touched.password}
              secureTextEntry
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => passwordConfirmRef.current?.focus()}
              {...signup.getTextInputProps('password')}
            />
          </View>

          <View style={styles.inputContainer}>
            {' '}
            <InputField
              ref={passwordConfirmRef}
              placeholder="비밀번호 확인"
              error={signup.errors.passwordConfirm}
              touched={signup.touched.passwordConfirm}
              secureTextEntry
              // onSubmitEditing={handleSubmit}
              {...signup.getTextInputProps('passwordConfirm')}
            />
          </View>

          <View style={styles.buttonContainer}>
            {' '}
            <CustomButton label="회원가입" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height * 0.2,
  },
  logo: {
    width: 120,
    height: 120,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
});

export default SignupScreen;
