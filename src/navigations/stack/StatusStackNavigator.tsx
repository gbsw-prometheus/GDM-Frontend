import React from 'react';
import {colors, mainNavigations} from '../../constants';
import {createStackNavigator} from '@react-navigation/stack';
import StatusHomeScreen from '../../screens/status/StatusHomeScreen';

export type StatusStackParamList = {
  [mainNavigations.HOME]: undefined;
  [mainNavigations.NOTICE_HOME]: undefined;
  [mainNavigations.STATUS_HOME]: undefined;
  [mainNavigations.PROFILE_HOME]: undefined;
};

const Stack = createStackNavigator<StatusStackParamList>();

function StatusStackNavigator() {
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
          fontWeight: 'bold',
          color: colors.GREEN,
        },
        headerTintColor: 'black',
      }}>
      <Stack.Screen
        name={mainNavigations.STATUS_HOME}
        component={StatusHomeScreen}
        options={{
          headerTitle: '현황판',
        }}
      />
    </Stack.Navigator>
  );
}

export default StatusStackNavigator;
