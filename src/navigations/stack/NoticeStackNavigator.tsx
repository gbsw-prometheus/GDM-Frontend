import React from 'react';
import {mainNavigations} from '../../constants';
import {createStackNavigator} from '@react-navigation/stack';
import NoticeHomScreen from '../../screens/notice/NoticeHomScreen';

export type NoticeStackParamList = {
  [mainNavigations.HOME]: undefined;
  [mainNavigations.NOTICE_HOME]: undefined;
  [mainNavigations.STATUS_HOME]: undefined;
  [mainNavigations.PROFILE_HOME]: undefined;
};

const Stack = createStackNavigator<NoticeStackParamList>();

function NoticeStackNavigator() {
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
        name={mainNavigations.NOTICE_HOME}
        component={NoticeHomScreen}
        options={{
          headerTitle: '공지사항',
        }}
      />
    </Stack.Navigator>
  );
}

export default NoticeStackNavigator;
