import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import useMeal from '../../hooks/useMeal';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

function HomeScreen() {
  const {data, isLoading, isError} = useMeal();
  const [selectedDate, setSelectedDate] = useState(new Date());

  // 날짜를 YYYYMMDD 형식으로 변환
  const formatDate = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  };

  // 날짜를 표시용으로 변환 (YYYY/MM/DD (요일))
  const formatDisplayDate = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const weekday = weekdays[date.getDay()];
    return `${year}/${month}/${day} (${weekday})`;
  };

  // 이전/다음 날짜로 이동
  const changeDate = direction => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + direction);
    setSelectedDate(newDate);
  };

  // 선택된 날짜의 급식 데이터 필터링
  const selectedDateString = formatDate(selectedDate);
  const todayMeals =
    data?.meals.filter(meal => meal.mlsv_YMD === selectedDateString) || [];

  // 급식 유형별로 데이터 정리
  const getMealByType = mealType => {
    return todayMeals.find(meal => meal.mmeal_SC_NM === mealType);
  };

  const breakfastMeal = getMealByType('조식');
  const lunchMeal = getMealByType('중식');
  const dinnerMeal = getMealByType('석식');

  // 급식 카드 컴포넌트 (중앙 정렬, 적당한 크기)
  const MealCard = ({title, meal}) => (
    <View style={styles.mealCard}>
      <Text style={styles.mealTitle}>{title}</Text>
      <View style={styles.dishListContainer}>
        {meal && meal.dishes ? (
          meal.dishes.map((dish, index) => (
            <Text key={index} style={styles.dishText}>
              {dish}
            </Text>
          ))
        ) : (
          <Text style={styles.noMealText}>급식 정보가 없습니다.</Text>
        )}
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.statusText}>로딩 중...</Text>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>급식 데이터를 불러오지 못했습니다.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* 날짜 선택기 */}
      <View style={styles.dateSelector}>
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={() => changeDate(-1)}>
          <Text style={styles.arrowText}>‹</Text>
        </TouchableOpacity>

        <View style={styles.dateDisplay}>
          <Text style={styles.dateText}>{formatDisplayDate(selectedDate)}</Text>
        </View>

        <TouchableOpacity
          style={styles.arrowButton}
          onPress={() => changeDate(1)}>
          <Text style={styles.arrowText}>›</Text>
        </TouchableOpacity>
      </View>

      {/* 급식 카드들 */}
      <View style={styles.mealCardsWrapper}>
        <ScrollView
          horizontal
          style={styles.mealContainer}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          pagingEnabled>
          <MealCard title="조식" meal={breakfastMeal} />
          <MealCard title="중식" meal={lunchMeal} />
          <MealCard title="석식" meal={dinnerMeal} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const CARD_WIDTH = Math.min(screenWidth * 0.8, 320);
const CARD_HEIGHT = Math.min(screenHeight * 0.35, 260);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  arrowButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  arrowText: {
    fontSize: 24,
    color: '#6c757d',
    fontWeight: 'bold',
  },
  dateDisplay: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 20,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
  },
  mealCardsWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mealContainer: {
    flexGrow: 0,
    alignSelf: 'center',
  },
  scrollContent: {
    alignItems: 'center',
    justifyContent: 'center',
    height: CARD_HEIGHT,
  },
  mealCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 12,
    textAlign: 'center',
  },
  dishListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dishText: {
    fontSize: 14,
    color: '#6c757d',
    lineHeight: 20,
    marginBottom: 4,
    textAlign: 'center',
  },
  noMealText: {
    fontSize: 14,
    color: '#adb5bd',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 20,
  },
  statusText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
    color: '#6c757d',
  },
  errorText: {
    fontSize: 16,
    color: '#dc3545',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default HomeScreen;
