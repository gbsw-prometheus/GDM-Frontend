import React from 'react';
import {colors, mainNavigations, statusNavigations} from '../../constants';
import {createStackNavigator} from '@react-navigation/stack';
import StatusHomeScreen from '../../screens/status/StatusHomeScreen';
import StatusDetailScreen from '../../screens/status/StatusDetail';

export type StatusStackParamList = {
  [mainNavigations.HOME]: undefined;
  [mainNavigations.NOTICE_HOME]: undefined;
  [mainNavigations.STATUS_HOME]: undefined;
  [mainNavigations.PROFILE_HOME]: undefined;
  [statusNavigations.STATUS_DETAIL]: {
    data: any[];
    title: string;
    type: 'absence' | 'going';
  };
  [statusNavigations.GOING_DETAIL]: {
    id: string;
    title: string;
  };
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
      <Stack.Screen
        name={statusNavigations.STATUS_DETAIL}
        component={StatusDetailScreen}
        options={{
          headerTitle: '상세 현황',
        }}
      />
    </Stack.Navigator>
  );
}

export default StatusStackNavigator;
