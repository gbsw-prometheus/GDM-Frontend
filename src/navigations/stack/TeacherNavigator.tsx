import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../screens/home/HomeScreen';
import NoticeHomeScreen from '../../screens/notice/NoticeHomScreen';
import NoticeWriteScreen from '../../screens/notice/NoticeWriteScreen';
import StatusHomeScreen from '../../screens/status/StatusHomeScreen';

const Stack = createStackNavigator();

const TeacherNavigator = () => {
  return (
    <Stack.Navigator

    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Notice" component={NoticeWriteScreen} />
      <Stack.Screen name="Stauts" component={StatusHomeScreen} />
    </Stack.Navigator>
  );
};

export default TeacherNavigator;