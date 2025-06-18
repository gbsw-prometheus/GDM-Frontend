import React, {useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Dimensions,
  Image,
} from 'react-native';
import InputField from '../../components/common/InputField';
import CustomButton from '../../components/common/CustomButton';
import useForm from '../../hooks/useForm';
import {validateLogin} from '../../utils/validate';
import useAuth from '../../hooks/queries/useAuth';

function LoginScreen() {
  const birthRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  const {loginMutation} = useAuth();

  const login = useForm({
    initialValue: {
      name: '',
      birth: '',
      password: '',
    },
    validate: validateLogin,
  });

  const handleSubmit = () => {
    loginMutation.mutate(login.values);
  };

  // const handleSubmit = () => {
  //   loginMutation.mutate(login.values, {
  //     onSuccess: () => {
  //       Alert.alert('로그인 성공');
  //     },
  //     onError: error => {
  //       let errorMsg = '';
  //       if (error.response) {
  //         errorMsg += `response: ${JSON.stringify(error.response, null, 2)}\n`;
  //       }
  //       if (error.request) {
  //         errorMsg += `request: ${JSON.stringify(error.request, null, 2)}\n`;
  //       }
  //       if (error.message) {
  //         errorMsg += `message: ${error.message}\n`;
  //       }
  //       errorMsg += `stringify: ${JSON.stringify(error, null, 2)}`;

  //       Alert.alert('로그인 실패(상세)', errorMsg);
  //     },
  //   });
  // };

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
              error={login.errors.name}
              touched={login.touched.name}
              inputMode="text"
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => birthRef.current?.focus()}
              {...login.getTextInputProps('name')}
            />
          </View>
          <View style={styles.inputContainer}>
            <InputField
              ref={birthRef}
              placeholder="생년월일 (YYYY/MM/DD)"
              error={login.errors.birth}
              touched={login.touched.birth}
              inputMode="text"
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => passwordRef.current?.focus()}
              {...login.getTextInputProps('birth')}
            />
          </View>
          <View style={styles.inputContainer}>
            <InputField
              ref={passwordRef}
              placeholder="비밀번호"
              error={login.errors.password}
              touched={login.touched.password}
              secureTextEntry
              returnKeyType="done"
              blurOnSubmit={false}
              onSubmitEditing={handleSubmit}
              {...login.getTextInputProps('password')}
            />
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton
              label="로그인"
              variant="filled"
              size="large"
              onPress={handleSubmit}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height * 0.4,
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

export default LoginScreen;
