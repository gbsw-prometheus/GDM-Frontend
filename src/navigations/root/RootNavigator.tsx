import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import AuthStackNavigator from '../stack/AuthStackNavigator';
import StudentTabNavigator from '../tab/StudentTabNavigator';
import TeacherTabNavigator from '../tab/TeacherTabNavigator';
import useAuth from '../../hooks/queries/useAuth';

function RootNavigator() {
  const { isLogin, role } = useAuth();

  if (!isLogin) {
    return <AuthStackNavigator />;
  }

  return role === 'TEACHER' ? <TeacherTabNavigator /> : <StudentTabNavigator />;
}

export default RootNavigator;