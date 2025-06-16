import React, { useRef } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
} from 'react-native';
import CustomButton from '../../components/common/CustomButton';
import InputField from '../../components/common/InputField';
import useForm from '../../hooks/useForm';
import { validateLogin } from '../../utils';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigations/stack/AuthStackNavigator';
import { authNavigations } from '../../constants/navigations';

type LoginScreenProps = StackScreenProps<AuthStackParamList, typeof authNavigations.LOGIN>;

function LoginScreen({ navigation }: LoginScreenProps) {
  const birthRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  const login = useForm({
    initialValue: {
      name: '',
      birth: '',
      password: '',
    },
    validate: validateLogin,
  });

  const handleSubmit = () => {
    console.log('로그인 시도:', login.values);
  };

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
              onSubmitEditing={() => birthRef.current?.focus()}
              {...login.getTextInputProps('name')}
            />
          </View>

          <View style={styles.inputContainer}>
            <InputField
              ref={birthRef}
              placeholder="생년월일 (YYYY-MM-DD)"
              error={login.errors.birth}
              touched={login.touched.birth}
              inputMode="text"
              returnKeyType="next"
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

          <View style={styles.helpTextContainer}>
            <Pressable onPress={() => navigation.navigate(authNavigations.SIGNUP)}>
            </Pressable>
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
    textDecorationLine: 'underline', // Added to indicate clickable text
  },
});

export default LoginScreen;