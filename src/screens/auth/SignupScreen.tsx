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

function SignupScreen() {
  const passwordRef = useRef<TextInput | null>(null);
  const passwordConfirmRef = useRef<TextInput | null>(null);

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
              inputMode="email"
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
              secureTextEntry
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => passwordConfirmRef.current?.focus()}
            />
          </View>

          <View style={styles.inputContainer}>
            {' '}
            <InputField
              ref={passwordConfirmRef}
              placeholder="비밀번호 확인"
              secureTextEntry
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

export default SignupScreen;
