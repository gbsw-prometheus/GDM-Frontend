import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
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
            <Text style={styles.buttonText}>출석 체크</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: colors.GREEN,
    width: 200,
    height: 200,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  attendanceInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginVertical: 4,
  },
});

export default AttendanceScreen;