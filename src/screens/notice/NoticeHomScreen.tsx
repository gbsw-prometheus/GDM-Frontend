import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NoticeWriteScreen from './NoticeWriteScreen';
import { useNotice } from '../../hooks/useNotice';
import { Notification } from '../../types';
import useAuth from '../../hooks/queries/useAuth';

const NoticeItem: React.FC<Notification> = ({ title, detail }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.itemWrapper}>
      <TouchableOpacity style={styles.itemContainer} onPress={toggleExpand}>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{title}</Text>
        </View>
        <Image
          source={
            isExpanded
              ? require('../../assets/top-arrow.png')
              : require('../../assets/down-arrow.png')
          }
          style={styles.arrowIcon}
        />
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.expandedContent}>
          <Text style={styles.expandedText}>{detail}</Text>
        </View>
      )}
    </View>
  );
};

const NoticeHomeScreen: React.FC = () => {
  const { role, isLoading: authLoading } = useAuth();
  const { getAllNotifications, isLoading, error, errorDetails } = useNotice();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (role === 'STUDENT') {
      const fetchNotifications = async () => {
        try {
          const response = await getAllNotifications();
          setNotifications(response.content);
        } catch (err) {
          Alert.alert(
            '오류',
            errorDetails || error || '공지사항 목록을 불러오는 중 오류가 발생했습니다.',
            [{ text: '확인', onPress: () => console.log('Alert closed') }]
          );
        }
      };

      fetchNotifications();
    }
  }, [role, getAllNotifications, error, errorDetails]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {authLoading ? (
          <Text style={styles.loadingText}>로딩 중...</Text>
        ) : role === 'TEACHER' ? (
          <NoticeWriteScreen />
        ) : (
          <>
            {isLoading && <Text style={styles.loadingText}>로딩 중...</Text>}
            {error && <Text style={styles.errorText}>{error}</Text>}
            {notifications.length === 0 && !isLoading && !error ? (
              <Text style={styles.emptyText}>공지사항이 없습니다.</Text>
            ) : (
              <FlatList
                data={notifications}
                renderItem={({ item }) => (
                  <NoticeItem
                    id={item.id}
                    title={item.title}
                    detail={item.detail}
                    dueDate={item.dueDate}
                    author={item.author}
                  />
                )}
                keyExtractor={item => item.id.toString()}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
            )}
          </>
        )}
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
    backgroundColor: '#fff',
    padding: 16,
  },
  selectContainer: {
    width: '35%',
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  selectStyle: {
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#eee',
    paddingHorizontal: 10,
  },
  itemWrapper: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    marginBottom: 4,
  },
  separator: {
    height: 8,
  },
  expandedContent: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  expandedText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  arrowIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginVertical: 20,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
    marginVertical: 20,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginVertical: 20,
  },
});

export default NoticeHomeScreen;