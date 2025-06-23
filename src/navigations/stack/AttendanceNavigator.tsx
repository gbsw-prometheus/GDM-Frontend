import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AttendanceScreen from '../../screens/attendance/AttendancdScreen';
import {mainNavigations} from '../../constants';

export type AttendanceStackParamList = {
  [mainNavigations.HOME]: undefined;
  [mainNavigations.ATTENDANCE]: undefined;
  [mainNavigations.NOTICE_HOME]: undefined;
  [mainNavigations.STATUS_HOME]: undefined;
  [mainNavigations.PROFILE_HOME]: undefined;
  AttendanceScreen: undefined;
};

const Stack = createStackNavigator<AttendanceStackParamList>();

function AttendanceStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
        headerStyle: {
          backgroundColor: 'white',
          shadowColor: 'gray',
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: 'black',
      }}>
      <Stack.Screen
        name={mainNavigations.ATTENDANCE}
        component={AttendanceScreen}
        options={{
          headerTitle: '출석 체크',
        }}
      />
    </Stack.Navigator>
  );
}

export default AttendanceStackNavigator;