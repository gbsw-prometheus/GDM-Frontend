import React from 'react';
import {Dimensions, Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {colors} from '../../constants';
// import {StackScreenProps} from '@react-navigation/stack';
// import {AuthStackParamList} from '../../navigations/stack/AuthStackNavigator';

// type AuthHomeScreenProps = StackScreenProps<
//   AuthStackParamList,
//   typeof authNavigations.AUTH_HOME
// >;

function AuthHomeScreen() {
  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={require('../../assets/white-logo.png')}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.GREEN,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    margin: 30,
  },
  imageContainer: {
    flex: 1.5,
    width: Dimensions.get('screen').width / 2,
  },
  image: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    gap: 10,
  },
});

export default AuthHomeScreen;
