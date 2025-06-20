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

type AbsenceData = {
  id: string;
  name: string;
  grade: number;
  class: number;
  number: number;
  userId: number;
  status: string;
};

type OutsideData = {
  id: string;
  name: string;
  type: string;
  time: string;
  userId: number;
  outDateTime: string;
  inDateTime: string;
  title: string;
  content: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
};

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
  isLoading?: boolean;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  count,
  onMorePress,
  isLoading = false,
}) => {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.headerRight}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#00C4B4" />
        ) : (
          count > 0 && (
            <Text style={styles.countText}>
              현재 {count}명 {title.includes('미출석') ? '미출석' : '외출/외박'}
            </Text>
          )
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
  const {absenceListQuery, goingListQuery} = useStatus();

  // 결석자 데이터 변환 및 필터링
  const filteredAbsenceData = useMemo(() => {
    if (!absenceListQuery.data) return [];

    return absenceListQuery.data
      .filter((student: AbsenceData) =>
        (student.name || '').includes(searchText),
      )
      .map((student: AbsenceData) => ({
        ...student,
        time: `${student.grade}학년 ${student.class}반 ${student.number}번`,
      }));
  }, [absenceListQuery.data, searchText]);

  // 외출/외박 데이터 변환 및 필터링
  const filteredOutsideData = useMemo(() => {
    if (!goingListQuery.data) return [];

    return goingListQuery.data
      .filter(
        (student: OutsideData) =>
          (student.name || '').includes(searchText) &&
          student.status === 'ACCEPTED',
      )
      .map((student: OutsideData) => {
        // 날짜 포맷팅
        const formatDateTime = (outDate: string, inDate: string) => {
          try {
            const outFormatted = outDate.split('T')[0];
            const inFormatted = inDate.split('T')[0];

            if (outFormatted === inFormatted) {
              // 같은 날이면 외출
              const outTime = outDate.split('T')[1]?.substring(0, 5) || '16:00';
              const inTime = inDate.split('T')[1]?.substring(0, 5) || '19:00';
              return `(${outTime} ~ ${inTime})`;
            } else {
              // 다른 날이면 외박
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
  }, [goingListQuery.data, searchText]);

  const displayedAbsenceData = filteredAbsenceData.slice(0, 3);
  const displayedOutsideData = filteredOutsideData.slice(0, 3);

  // 새로고침 함수
  const onRefresh = () => {
    absenceListQuery.refetch();
    goingListQuery.refetch();
  };

  const isRefreshing = absenceListQuery.isFetching || goingListQuery.isFetching;

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

        <FlatList
          data={[{key: 'content'}]}
          keyExtractor={item => item.key}
          renderItem={() => (
            <View>
              {/* 미출석 현황 섹션 */}
              <View style={styles.section}>
                <SectionHeader
                  title="미출석 현황"
                  count={filteredAbsenceData.length}
                  isLoading={absenceListQuery.isLoading}
                  onMorePress={() =>
                    navigation.navigate(statusNavigations.STATUS_DETAIL, {
                      data: filteredAbsenceData,
                      title: '미출석 현황',
                      type: 'absence',
                    })
                  }
                />
                {absenceListQuery.isError ? (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>
                      데이터를 불러오는데 실패했습니다.
                    </Text>
                    <TouchableOpacity
                      style={styles.retryButton}
                      onPress={() => absenceListQuery.refetch()}>
                      <Text style={styles.retryButtonText}>다시 시도</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <FlatList
                    data={displayedAbsenceData}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                      <StudentItem name={item.name} time={item.time} />
                    )}
                    ItemSeparatorComponent={() => (
                      <View style={styles.separator} />
                    )}
                    scrollEnabled={false}
                    ListEmptyComponent={
                      !absenceListQuery.isLoading ? (
                        <View style={styles.emptyContainer}>
                          <Text style={styles.emptyText}>
                            미출석 학생이 없습니다.
                          </Text>
                        </View>
                      ) : null
                    }
                  />
                )}
              </View>

              {/* 외출/외박 현황 섹션 */}
              <View style={styles.section}>
                <SectionHeader
                  title="외출/외박 현황"
                  count={filteredOutsideData.length}
                  isLoading={goingListQuery.isLoading}
                  onMorePress={() =>
                    navigation.navigate(statusNavigations.STATUS_DETAIL, {
                      data: filteredOutsideData,
                      title: '외출/외박 현황',
                      type: 'going',
                    })
                  }
                />
                {goingListQuery.isError ? (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>
                      데이터를 불러오는데 실패했습니다.
                    </Text>
                    <TouchableOpacity
                      style={styles.retryButton}
                      onPress={() => goingListQuery.refetch()}>
                      <Text style={styles.retryButtonText}>다시 시도</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
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
                    ItemSeparatorComponent={() => (
                      <View style={styles.separator} />
                    )}
                    scrollEnabled={false}
                    ListEmptyComponent={
                      !goingListQuery.isLoading ? (
                        <View style={styles.emptyContainer}>
                          <Text style={styles.emptyText}>
                            외출/외박 중인 학생이 없습니다.
                          </Text>
                        </View>
                      ) : null
                    }
                  />
                )}
              </View>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
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

export default StatusHomeScreen;
