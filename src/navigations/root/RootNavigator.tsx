import React from 'react';
import AuthHomeScreen from '../../screens/auth/AuthHomeScreen';
import LoginScreen from '../../screens/auth/LoginScreen';
import SignupScreen from '../../screens/auth/SignupScreen';

function RootNavigator() {
  // const {isLogin} = useAuth();
  const isLogin = false;

  return <>{isLogin ? <AuthHomeScreen /> : <SignupScreen />}</>;
}

export default RootNavigator;
