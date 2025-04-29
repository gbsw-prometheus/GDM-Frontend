import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';

type AbsenceData = {
  id: string;
  name: string;
  time: string;
};

type OutsideData = {
  id: string;
  name: string;
  type: string;
  time: string;
};

const absenceData: AbsenceData[] = [
  {id: '1', name: '성홍제', time: '3학년 1반 12번'},
  {id: '2', name: '유진승', time: '3학년 1반 13번'},
  {id: '3', name: '박준호', time: '3학년 1반 11번'},
  {id: '4', name: '이병호', time: '3학년 1반 15번'},
  {id: '5', name: '성홍제', time: '3학년 1반 12번'},
];

const outsideData: OutsideData[] = [
  {id: '1', name: '성홍제', type: '외출중', time: '(16:00 ~ 19:00)'},
  {id: '2', name: '유진승', type: '외박중', time: '(03/18 ~ 03/19)'},
  {id: '3', name: '박준호', type: '외출중', time: '(16:00 ~ 19:00)'},
  {id: '4', name: '이병호', type: '외출중', time: '(16:00 ~ 19:00)'},
  {id: '5', name: '성홍제', type: '', time: '3학년 1반 12번'},
];

type StudentItemProps = {
  name: string;
  status?: string;
  time: string;
};

const StudentItem: React.FC<StudentItemProps> = ({name, status = '', time}) => {
  return (
    <View style={styles.itemWrapper}>
      <View style={styles.itemContainer}>
        <View style={styles.iconContainer}>
          <Image
            source={require('../../assets/gbswhs.png')}
            style={styles.icon}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{name}</Text>
          {status ? (
            <View style={styles.statusContainer}>
              <Text style={styles.status}>{status}</Text>
              <Text style={styles.time}>{time}</Text>
            </View>
          ) : (
            <Text style={styles.time}>{time}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

type SectionHeaderProps = {
  title: string;
  count: number;
  onMorePress: () => void;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  count,
  onMorePress,
}) => {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.headerRight}>
        {count > 0 && (
          <Text style={styles.countText}>현재 {count}명 미출석</Text>
        )}
        <TouchableOpacity onPress={onMorePress}>
          <Text style={styles.moreText}>[더보기]</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

type StatusHomeScreenProps = {
  navigation: any;
};

const StatusHomeScreen: React.FC<StatusHomeScreenProps> = ({navigation}) => {
  const [searchText, setSearchText] = useState('');

  const filteredAbsenceData = absenceData.filter(student =>
    student.name.includes(searchText),
  );
  const filteredOutsideData = outsideData.filter(student =>
    student.name.includes(searchText),
  );

  const displayedAbsenceData = filteredAbsenceData.slice(0, 3);
  const displayedOutsideData = filteredOutsideData.slice(0, 3);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Image
            source={require('../../assets/search.png')}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="학생 검색"
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <View style={styles.section}>
          <SectionHeader
            title="미출석 현황"
            count={filteredAbsenceData.length}
            onMorePress={() =>
              navigation.navigate('StatusDetail', {
                data: filteredAbsenceData,
                title: '미출석 현황',
              })
            }
          />
          <FlatList
            data={displayedAbsenceData}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <StudentItem name={item.name} time={item.time} />
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            scrollEnabled={false}
          />
        </View>

        <View style={styles.section}>
          <SectionHeader
            title="외출/외박 현황"
            count={filteredOutsideData.length}
            onMorePress={() =>
              navigation.navigate('StatusDetail', {
                data: filteredOutsideData,
                title: '외출/외박 현황',
              })
            }
          />
          <FlatList
            data={displayedOutsideData}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <StudentItem
                name={item.name}
                status={item.type}
                time={item.time}
              />
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            scrollEnabled={false}
          />
        </View>
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
  searchContainer: {
    width: '95%',
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 20,
    height: 45,
  },
  searchIcon: {
    width: 14,
    height: 18,
    marginRight: 8,
    borderRadius: 8,
    resizeMode: 'contain',
    tintColor: '#999',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 0,
    fontSize: 14,
    color: '#333',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countText: {
    color: '#888',
    fontSize: 12,
    marginRight: 8,
  },
  moreText: {
    color: '#00C4B4',
    fontSize: 12,
  },
  itemWrapper: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginHorizontal: 16,
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
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  status: {
    fontSize: 14,
    color: '#00C4B4',
    marginRight: 4,
  },
  time: {
    fontSize: 14,
    color: '#888',
  },
  separator: {
    height: 8,
  },
});

export default StatusHomeScreen;
