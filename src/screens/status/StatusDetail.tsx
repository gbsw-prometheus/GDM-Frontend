import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import useStatus from '../../hooks/queries/useStatus';
import {statusNavigations} from '../../constants/navigations';

type RouteParams = {
  data: any[];
  title: string;
  type: 'absence' | 'going';
};

type StatusDetailScreenProps = {
  navigation: any;
  route: {
    params: RouteParams;
  };
};

type StudentItemProps = {
  name: string;
  status?: string;
  time: string;
  onPress?: () => void;
};

const StudentItem: React.FC<StudentItemProps> = ({
  name,
  status = '',
  time,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.itemWrapper}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}>
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
        {onPress && (
          <View style={styles.arrowContainer}>
            <Text style={styles.arrow}>{'>'}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const StatusDetailScreen: React.FC<StatusDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const {title, type} = route.params;
  const [searchText, setSearchText] = useState('');
  const {absenceListQuery, goingListQuery} = useStatus();

  // 서버에서 최신 데이터 가져오기
  const query = type === 'absence' ? absenceListQuery : goingListQuery;

  // 데이터 변환 및 필터링
  const filteredData = useMemo(() => {
    if (!query.data) return [];

    let processedData = [];

    if (type === 'absence') {
      processedData = query.data.map((student: any) => ({
        ...student,
        time: `${student.grade}학년 ${student.class}반 ${student.number}번`,
      }));
    } else {
      processedData = query.data
        .filter((student: any) => student.status === 'ACCEPTED')
        .map((student: any) => {
          const formatDateTime = (outDate: string, inDate: string) => {
            try {
              const outFormatted = outDate.split('T')[0];
              const inFormatted = inDate.split('T')[0];

              if (outFormatted === inFormatted) {
                const outTime =
                  outDate.split('T')[1]?.substring(0, 5) || '16:00';
                const inTime = inDate.split('T')[1]?.substring(0, 5) || '19:00';
                return `(${outTime} ~ ${inTime})`;
              } else {
                const outDateFormatted = outFormatted
                  .substring(5)
                  .replace('-', '/');
                const inDateFormatted = inFormatted
                  .substring(5)
                  .replace('-', '/');
                return `(${outDateFormatted} ~ ${inDateFormatted})`;
              }
            } catch (error) {
              return '(시간 정보 없음)';
            }
          };

          const isOvernight =
            student.outDateTime.split('T')[0] !==
            student.inDateTime.split('T')[0];

          return {
            ...student,
            type: isOvernight ? '외박중' : '외출중',
            time: formatDateTime(student.outDateTime, student.inDateTime),
          };
        });
    }

    return processedData.filter((student: any) =>
      (student.name || '').includes(searchText),
    );
  }, [query.data, searchText, type]);

  // 새로고침 함수
  const onRefresh = () => {
    query.refetch();
  };

  // 아이템 클릭 핸들러
  const handleItemPress = (item: any) => {
    if (type === 'going') {
      navigation.navigate(statusNavigations.GOING_DETAIL, {
        id: item.id,
        title: item.title,
      });
    }
  };

  const renderItem = ({item}: {item: any}) => (
    <StudentItem
      name={item.name}
      status={type === 'going' ? item.type : undefined}
      time={item.time}
      onPress={type === 'going' ? () => handleItemPress(item) : undefined}
    />
  );

  const renderSeparator = () => <View style={styles.separator} />;

  const renderEmpty = () => {
    if (query.isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00C4B4" />
          <Text style={styles.loadingText}>데이터를 불러오는 중...</Text>
        </View>
      );
    }

    if (query.isError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            데이터를 불러오는데 실패했습니다.
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={onRefresh}>
            <Text style={styles.retryButtonText}>다시 시도</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {type === 'absence'
            ? '미출석 학생이 없습니다.'
            : '외출/외박 중인 학생이 없습니다.'}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* 검색 */}
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

        {/* 결과 개수 */}
        <View style={styles.countContainer}>
          <Text style={styles.countText}>
            총 {filteredData.length}명
            {type === 'absence' ? ' 미출석' : ' 외출/외박 중'}
          </Text>
        </View>

        {/* 리스트 */}
        <FlatList
          data={filteredData}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ItemSeparatorComponent={renderSeparator}
          ListEmptyComponent={renderEmpty}
          refreshControl={
            <RefreshControl
              refreshing={query.isFetching}
              onRefresh={onRefresh}
            />
          }
        />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    marginBottom: 8,
  },
  backButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  backButtonText: {
    fontSize: 20,
    color: '#00C4B4',
    fontWeight: 'bold',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  headerRight: {
    width: 32,
  },
  searchContainer: {
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
  countContainer: {
    marginBottom: 10,
    alignItems: 'flex-end',
  },
  countText: {
    color: '#888',
    fontSize: 13,
  },
  itemWrapper: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginHorizontal: 4,
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
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
  },
  arrow: {
    fontSize: 18,
    color: '#888',
    fontWeight: 'bold',
  },
  separator: {
    height: 8,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    color: '#00C4B4',
    fontSize: 14,
    marginTop: 10,
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 14,
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: '#00C4B4',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#888',
    fontSize: 14,
  },
});

export default StatusDetailScreen;
