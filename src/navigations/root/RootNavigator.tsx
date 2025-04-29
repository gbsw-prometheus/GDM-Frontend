import React from 'react';
import AuthStackNavigator from '../stack/AuthStackNavigator';
import MainTabNavigator from '../tab/MainTabNavigator';
// import useAuth from '../../hooks/useAuth';

function RootNavigator() {
  // const {isLogin} = useAuth();
  const isLogin = true;

  return <>{isLogin ? <MainTabNavigator /> : <AuthStackNavigator />}</>;
}

export default RootNavigator;
