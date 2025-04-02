import React, {useRef} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';
import CustomButton from '../../components/common/CustomButton';
import InputField from '../../components/common/InputField';
import useForm from '../../hooks/useForm';
import {validateLogin} from '../../utils';

function LoginScreen() {
  const passwordRef = useRef<TextInput | null>(null);

  const login = useForm({
    initialValue: {
      email: '',
      password: '',
    },
    validate: validateLogin,
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
              placeholder="이메일"
              error={login.erros.email}
              touched={login.touched.email}
              inputMode="email"
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => passwordRef.current?.focus()}
              {...login.getTextInputProps('email')}
            />
          </View>

          <View style={styles.inputContainer}>
            <InputField
              ref={passwordRef}
              placeholder="비밀번호"
              error={login.erros.password}
              touched={login.touched.password}
              secureTextEntry
              returnKeyType="join"
              blurOnSubmit={false}
              // onSubmitEditing={handleSubmit}
              {...login.getTextInputProps('password')}
            />
          </View>

          <View style={styles.buttonContainer}>
            <CustomButton label="로그인" variant="filled" size="large" />
          </View>

          <View style={styles.helpTextContainer}>
            <Text style={styles.helpText}>아직 학생 인증을 안하셨나요?</Text>
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
  helpTextContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  helpText: {
    color: '#888',
    fontSize: 14,
  },
});

export default LoginScreen;
