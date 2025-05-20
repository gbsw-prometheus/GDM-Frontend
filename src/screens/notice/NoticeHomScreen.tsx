import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import { colors, mainNavigations } from '../../constants';
import NoticeWriteScreen from './NoticeWriteScreen';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NoticeStackParamList } from '../../navigations/stack/NoticeStackNavigator';

export type NoticeHomeParamList = {
  NoticeHomScreen: undefined;
  NoticeWriteScreen: undefined;
};

type NoticeItemProps = {
  id: number;
  content: string;
};

const NoticeItem: React.FC<NoticeItemProps> = ({ content }) => {
  return (
    <View style={styles.itemWrapper}>
      <View style={styles.itemContainer}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>📢</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{content}</Text>
        </View>
      </View>
    </View>
  );
};

const noticeData = [
  { id: 1, content: '오후 2시부터 2시 30분까지 출석체크 하세요!' },
  { id: 2, content: '205호 학생 전부 내려오세요.' },
  { id: 3, content: '점심시간은 2시까지!!' },
  { id: 4, content: '점심시간은 2시까지!!' },
  { id: 5, content: '점심시간은 2시까지!!' },
  { id: 6, content: '점심시간은 2시까지!!' },
  { id: 7, content: '점심시간은 2시까지!!' },
  { id: 8, content: '점심시간은 2시까지!!' },
  { id: 9, content: '점심시간은 2시까지!!' },
  { id: 10, content: '점심시간은 2시까지!!' },
];

function NoticeHomScreen({ navigation }: NativeStackScreenProps<NoticeStackParamList, typeof mainNavigations.NOTICE_HOME>) {
  const [user, setUser] = useState('admin'); // user 또는 admin으로 변경하여 테스트하세용
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('recent');
  const [items, setItems] = useState([
    { label: '최신순', value: 'recent' },
    { label: '오래된순', value: 'old' },
  ]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {user === 'user' ? (
          <>
            <View style={styles.selectContainer}>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                style={styles.selectStyle}
                zIndex={3000}
                zIndexInverse={1000}
              />
            </View>
            <FlatList
              data={value === 'recent' ? noticeData : [...noticeData].reverse()}
              renderItem={({item}) => (
                <NoticeItem id={item.id} content={item.content} />
              )}
              keyExtractor={item => item.id.toString()}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </>
        ) : (
          <>
            <View style={styles.selectContainer}>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                style={styles.selectStyle}
                zIndex={3000}
                zIndexInverse={1000}
              />
            </View>
            {/* <FlatList
              data={value === 'recent' ? noticeData : [...noticeData].reverse()}
              renderItem={({item}) => (
                <NoticeItem id={item.id} content={item.content} />
              )}
              keyExtractor={item => item.id.toString()}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            /> */}
            <View style={styles.noticeButtonContainer}>
              <View style={styles.noticeButton}>
                <Button
                  title="공지사항 쓰기"
                  color={'#fff'}
                  onPress={() => {
                    navigation.navigate('NoticeWriteScreen');
                  }}
                />
              </View>
            </View>
          </>
        )}
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
  selectContainer: {
    width: '35%',
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    height: 20,
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
  iconContainer: {
    marginRight: 12,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
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
  adminSeparator: {
    height: 1
  },
  noticeButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noticeButton: {
    backgroundColor: `${colors.GREEN}`,
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    width: 330,
  }
});

export default NoticeHomScreen;