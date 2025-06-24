import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OutingScreen from '../../screens/outing/OutingScreen';
import {mainNavigations} from '../../constants';

export type OutingStackParamList = {
  [mainNavigations.HOME]: undefined;
  [mainNavigations.ATTENDANCE]: undefined;
  [mainNavigations.NOTICE_HOME]: undefined;
  [mainNavigations.STATUS_HOME]: undefined;
  [mainNavigations.PROFILE_HOME]: undefined;
  [mainNavigations.OUTING]: undefined;
  OutingScreen: undefined;
};

const Stack = createStackNavigator<OutingStackParamList>();

function OutingStackNavigator() {
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
        name={mainNavigations.OUTING}
        component={OutingScreen}
        options={{
          headerTitle: '외출/외박 신청',
        }}
      />
    </Stack.Navigator>
  );
}

export default OutingStackNavigator;