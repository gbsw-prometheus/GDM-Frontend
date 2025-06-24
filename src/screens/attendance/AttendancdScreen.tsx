import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image, // Import the Image component
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../constants';
import axiosInstance from '../../api/axios';

const AttendanceScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAttendanceCheck = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/api/attendance/check');
      const attendanceData = response.data;

      Alert.alert(
        '성공',
        `출석 체크 완료: ${new Date(attendanceData.checkTime).toLocaleString('ko-KR')}`,
        [{ text: '확인', onPress: () => console.log('Alert closed') }]
      );
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        Alert.alert(
          '출석 시간 아님',
          '아직 출석 체크 시간이 아닙니다.',
          [{ text: '확인', onPress: () => console.log('Alert closed') }]
        );
      } else {
        let errorMsg = '';
        if (error.response) {
          errorMsg += `response: ${JSON.stringify(error.response, null, 2)}\n`;
        }
        if (error.request) {
          errorMsg += `request: ${JSON.stringify(error.request, null, 2)}\n`;
        }
        if (error.message) {
          errorMsg += `message: ${error.message}\n`;
        }
        errorMsg += `stringify: ${JSON.stringify(error, null, 2)}`;

        Alert.alert('출석 체크 실패(상세)', errorMsg, [
          { text: '확인', onPress: () => console.log('Alert closed') },
        ]);
      }
      console.error('Attendance check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleAttendanceCheck}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Image
              source={require('../../assets/white-logo.png')} // Use require for local images
              style={styles.buttonImage}
              resizeMode="contain" // Adjust how the image fits
            />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: colors.GREEN,
    width: 220,
    height: 220,
    borderRadius: 110,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
  buttonImage: {
    width: 150, // Adjust size as needed
    height: 150, // Adjust size as needed
    tintColor: '#fff', // Optional: tint the image white if needed
  },
});

export default AttendanceScreen;