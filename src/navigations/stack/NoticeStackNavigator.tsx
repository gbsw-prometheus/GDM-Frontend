import React from 'react';
import {colors, mainNavigations} from '../../constants';
import {createStackNavigator} from '@react-navigation/stack';
import NoticeHomScreen from '../../screens/notice/NoticeHomScreen';
import NoticeWriteScreen from '../../screens/notice/NoticeWriteScreen';

export type NoticeStackParamList = {
  [mainNavigations.HOME]: undefined;
  [mainNavigations.NOTICE_HOME]: undefined;
  [mainNavigations.STATUS_HOME]: undefined;
  [mainNavigations.PROFILE_HOME]: undefined;
  [mainNavigations.ATTENDANCE]: undefined;
  NoticeWriteScreen: undefined;
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
          fontWeight: 'bold',
          color: colors.GREEN,
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
      <Stack.Screen
        name="NoticeWriteScreen"
        component={NoticeWriteScreen}
        options={{
          headerTitle: '공지사항 작성',
        }}
      />
    </Stack.Navigator>
  );
}

export default NoticeStackNavigator;
