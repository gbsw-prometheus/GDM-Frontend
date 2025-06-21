import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import NoticeWriteScreen from './NoticeWriteScreen';

type NoticeItemProps = {
  id: number;
  content: string;
};

const noticeData: NoticeItemProps[] = [
  {id: 1, content: '오후 2시부터 2시 30분까지 출석체크 하세요!'},
  {id: 2, content: '205호 학생 전부 내려오세요.'},
  {id: 3, content: '점심시간은 2시까지!!'},
  {id: 4, content: '금일 청소는 203, 305, 402호입니다.'},
  {id: 5, content: '금일 체육관 사용가능합니다.'},
  {id: 6, content: '유진승 학생 사감실로 오세요.'},
  {id: 7, content: '박준호 학생 출석체크하세요!!'},
  {id: 8, content: '저녁식사 하러 가세요!!'},
  {id: 9, content: '성홍제 학생 모범학생으로 상점 200점 발급!!'},
  {id: 10, content: '206, 302, 402, 405, 410호 소등하세요.'},
];

const NoticeItem: React.FC<NoticeItemProps> = ({content}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.itemWrapper}>
      <TouchableOpacity style={styles.itemContainer} onPress={toggleExpand}>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{content}</Text>
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
          <Text style={styles.expandedText}>{content}</Text>
        </View>
      )}
    </View>
  );
};

const NoticeHomeScreen: React.FC = () => {
  const [user, setUser] = useState<'user' | 'admin'>('user');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {user === 'user' ? (
          <>
            <FlatList
              data={noticeData}
              renderItem={({item}) => (
                <NoticeItem id={item.id} content={item.content} />
              )}
              keyExtractor={item => item.id.toString()}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </>
        ) : (
          <>
            <NoticeWriteScreen />
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
    marginBottom: 20,
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
    shadowOffset: {width: 0, height: 1},
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
});

export default NoticeHomeScreen;
