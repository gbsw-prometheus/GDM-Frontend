import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../constants';
import axiosInstance from '../../api/axios';

function OutingWriteScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [outDateTime, setOutDateTime] = useState('');
  const [inDateTime, setInDateTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 입력값 유효성 체크 (빈 문자열 또는 공백만 있는 경우 제외)
  const isValidInput = (value: string) => value.trim().length > 0;

  // 날짜 형식 유효성 체크 (YYYY-MM-DD)
  const isValidDateFormat = (dateString: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
  };

  const handleSubmit = async () => {
    if (!isValidInput(title) || !isValidInput(content) || !isValidInput(outDateTime) || !isValidInput(inDateTime)) {
      Alert.alert('오류', '모든 필드를 입력해주세요.', [
        { text: '확인', onPress: () => console.log('Alert closed') },
      ]);
      return;
    }

    // 날짜 형식 검증
    if (!isValidDateFormat(outDateTime) || !isValidDateFormat(inDateTime)) {
      Alert.alert('오류', '날짜 형식을 YYYY-MM-DD로 입력해주세요.', [
        { text: '확인', onPress: () => console.log('Alert closed') },
      ]);
      return;
    }

    // outDateTime이 inDateTime보다 이전이어야 함 (문자열 비교)
    if (outDateTime >= inDateTime) {
      Alert.alert('오류', '외출 시작 날짜는 복귀 날짜보다 이전이어야 합니다.', [
        { text: '확인', onPress: () => console.log('Alert closed') },
      ]);
      return;
    }

    try {
      setIsLoading(true);
      
      const payload = {
        userName: '', // 백엔드에서 처리하거나 세션에서 가져옴
        userBirth: '', // 백엔드에서 처리하거나 세션에서 가져옴
        outDateTime: outDateTime.trim(),
        inDateTime: inDateTime.trim(),
        title: title.trim(),
        content: content.trim(),
      };

      const response = await axiosInstance.post('/api/going/registration', payload);

      if (response.status === 200 || response.status === 201) {
        Alert.alert(
          '성공',
          '외출/외박 신청이 성공적으로 작성되었습니다.',
          [
            {
              text: '확인',
              onPress: () => {
                console.log('Outing application created');
                setTitle('');
                setContent('');
                setOutDateTime('');
                setInDateTime('');
              },
            },
          ]
        );
      } else {
        throw new Error('서버 응답이 실패했습니다.');
      }
    } catch (error: any) {
      let errorMsg = '';
      if (error.response) {
        errorMsg += `response: ${JSON.stringify(error.response.data, null, 2)}\n`;
      }
      if (error.request) {
        errorMsg += `request: ${JSON.stringify(error.request, null, 2)}\n`;
      }
      if (error.message) {
        errorMsg += `message: ${error.message}\n`;
      }
      errorMsg += `stringify: ${JSON.stringify(error, null, 2)}`;

      Alert.alert('외출/외박 신청 실패(상세)', errorMsg, [
        { text: '확인', onPress: () => console.log('Alert closed') },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>외출/외박 신청</Text>
        <TextInput
          style={styles.titleInput}
          placeholder="신청 제목을 입력하세요"
          value={title}
          onChangeText={setTitle}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.dateInput}
          placeholder="외출 시작 날짜 (YYYY-MM-DD)"
          value={outDateTime}
          onChangeText={setOutDateTime}
          autoCapitalize="none"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.dateInput}
          placeholder="복귀 날짜 (YYYY-MM-DD)"
          value={inDateTime}
          onChangeText={setInDateTime}
          autoCapitalize="none"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.contentInput}
          placeholder="신청 내용을 입력하세요"
          value={content}
          onChangeText={setContent}
          multiline
          numberOfLines={10}
          textAlignVertical="top"
          autoCapitalize="none"
        />
        <View style={styles.buttonContainer}>
          <View style={styles.submitButton}>
            <Button
              title={isLoading ? '전송 중...' : '신청 완료'}
              color="#fff"
              onPress={handleSubmit}
              disabled={isLoading}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  titleInput: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 12,
    height: 48,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 12,
    height: 48,
  },
  contentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  buttonContainer: {
    padding: 16,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: colors.GREEN,
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    width: 370,
  },
});

export default OutingWriteScreen;