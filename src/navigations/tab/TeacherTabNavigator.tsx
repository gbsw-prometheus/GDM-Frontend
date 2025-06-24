import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors, mainTabNavigations } from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import HomeStackNavigator from '../stack/HomeStackNavigator';
import NoticeStackNavigator from '../stack/NoticeStackNavigator';
import StatusStackNavigator from '../stack/StatusStackNavigator';

export type TeacherTabParamList = {
  [mainTabNavigations.HOME]: undefined;
  [mainTabNavigations.NOTICE_HOME]: undefined;
  [mainTabNavigations.STATUS_HOME]: undefined;
};

const Tab = createBottomTabNavigator<TeacherTabParamList>();

function TabBarIcons(
  route: RouteProp<TeacherTabParamList, keyof TeacherTabParamList>,
  focused: boolean,
) {
  let iconName = '';

  switch (route.name) {
    case mainTabNavigations.HOME:
      iconName = focused ? 'home' : 'home-outline';
      break;
    case mainTabNavigations.NOTICE_HOME:
      iconName = focused ? 'notifications' : 'notifications-outline';
      break;
    case mainTabNavigations.STATUS_HOME:
      iconName = focused ? 'list' : 'list-outline';
      break;
  }

  return (
    <Ionicons
      name={iconName}
      color={focused ? colors.GRAY_200 : colors.WHITE}
      size={25}
    />
  );
}

function TeacherTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: colors.WHITE,
          shadowColor: colors.GRAY_200,
        },
        headerTitleStyle: {
          fontSize: 15,
          fontWeight: 'bold',
        },
        headerTintColor: colors.BLACK,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.WHITE,
        tabBarInactiveTintColor: colors.WHITE,
        tabBarStyle: {
          height: 70,
          paddingTop: 5,
          backgroundColor: colors.GREEN,
          borderTopColor: colors.GREEN,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          borderLeftWidth: 0.2,
          borderRightWidth: 0.2,
        },
        tabBarIcon: ({ focused }) => TabBarIcons(route, focused),
      })}
    >
      <Tab.Screen
        name={mainTabNavigations.HOME}
        component={HomeStackNavigator}
        options={{
          headerShown: false,
          tabBarLabel: '홈',
        }}
      />
      <Tab.Screen
        name={mainTabNavigations.NOTICE_HOME}
        component={NoticeStackNavigator}
        options={{
          headerShown: false,
          tabBarLabel: '공지사항',
        }}
      />
      <Tab.Screen
        name={mainTabNavigations.STATUS_HOME}
        component={StatusStackNavigator}
        options={{
          headerShown: false,
          tabBarLabel: '현황판',
        }}
      />
    </Tab.Navigator>
  );
}

export default TeacherTabNavigator;