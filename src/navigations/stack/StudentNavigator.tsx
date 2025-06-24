import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../screens/home/HomeScreen';
import AttendanceScreen from '../../screens/attendance/AttendancdScreen';
import OutingScreen from '../../screens/outing/OutingScreen';
import NoticeHomeScreen from '../../screens/notice/NoticeHomScreen';

const Stack = createStackNavigator();

const StudentNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Attendance" component={AttendanceScreen} />
      <Stack.Screen name="Outing" component={OutingScreen} />
      <Stack.Screen name="Notice" component={NoticeHomeScreen} />
    </Stack.Navigator>
  );
};

export default StudentNavigator;