import React from 'react';
import {Dimensions, Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {colors} from '../../constants';
import CustomButton from '../../components/common/CustomButton';
import {AuthStackParamList} from '../../navigations/stack/AuthStackNavigator';
import {authNavigations} from '../../constants/navigations';
import {StackScreenProps} from '@react-navigation/stack';

type AuthHomeScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.AUTH_HOME
>;

function AuthHomeScreen({navigation}: AuthHomeScreenProps) {
  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={require('../../assets/green-logo.png')}
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            label="로그인하기"
            variant="filled"
            size="large"
            onPress={() => navigation.navigate(authNavigations.LOGIN)}
          />
          <CustomButton
            label="회원가입하기"
            variant="filled"
            size="large"
            onPress={() => navigation.navigate(authNavigations.SIGNUP)}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    margin: 30,
  },
  imageContainer: {
    flex: 2,
    width: Dimensions.get('screen').width / 3,
  },
  image: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    gap: 10,
    width: '80%',
    alignItems: 'center',
    marginTop: 20, // Added margin to create more space above buttons
  },
});

export default AuthHomeScreen;
