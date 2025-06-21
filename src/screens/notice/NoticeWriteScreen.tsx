import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../constants';
import { useNotice } from '../../hooks/useNotice';
import { NotificationPayload } from '../../types';

function NoticeWriteScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { createNotification, isLoading, error } = useNotice();

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('오류', '제목과 내용을 모두 입력해주세요.', [
        { text: '확인', onPress: () => console.log('Alert closed') },
      ]);
      return;
    }

    try {
      const payload: NotificationPayload = {
        title,
        detail: content, // Mapping content to detail as per API schema
      };
      const response = await createNotification(payload);
      
      if (response.success) {
        Alert.alert(
          '성공',
          '공지사항이 성공적으로 작성되었습니다.',
          [
            {
              text: '확인',
              onPress: () => {
                console.log('Notification created');
                setTitle('');
                setContent('');
              },
            },
          ]
        );
      }
    } catch (err) {
      Alert.alert(
        '오류',
        error || '공지사항 작성 중 오류가 발생했습니다.',
        [{ text: '확인', onPress: () => console.log('Alert closed') }]
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>공지사항 작성</Text>
        <TextInput
          style={styles.titleInput}
          placeholder="공지사항 제목을 입력하세요"
          value={title}
          onChangeText={setTitle}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.contentInput}
          placeholder="공지사항 내용을 입력하세요"
          value={content}
          onChangeText={setContent}
          multiline
          numberOfLines={10}
          textAlignVertical="top"
          autoCapitalize="none"
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
        <View style={styles.buttonContainer}>
          <View style={styles.submitButton}>
            <Button
              title={isLoading ? '전송 중...' : '작성 완료'}
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
  errorText: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
});

export default NoticeWriteScreen;