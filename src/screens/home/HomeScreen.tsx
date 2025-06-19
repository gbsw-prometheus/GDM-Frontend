import React, { useState } from 'react';
import { SafeAreaView, Text, View, Button, FlatList, StyleSheet } from 'react-native';
import useMeal from '../../hooks/useMeal'; // useMeal 훅 파일 경로에 맞게 조정

interface Meal {
  mlsv_YMD: string; // 급식 날짜
  mmeal_SC_NM: string; // 급식 종류 (예: 아침, 점심)
  ddish_NM: string; // 음식 이름
  dishes: string[]; // 파싱된 음식 목록
}

function HomeScreen() {
  const { mealData, loading, error } = useMeal();
  const [selectedMealType, setSelectedMealType] = useState<string>('조식'); // 기본값: 조식

  // 급식 데이터를 선택된 종류에 따라 필터링
  const filteredMeals = mealData?.meals.filter(
    (meal: Meal) => meal.mmeal_SC_NM === selectedMealType
  ) || [];

  // 급식 항목 렌더링 함수
  const renderMealItem = ({ item }: { item: Meal }) => (
    <View style={styles.mealItem}>
      {item.dishes.map((dish, index) => (
        <Text key={index} style={styles.mealText}>{dish}</Text>
      ))}
      <Text style={styles.mealDate}>{item.mlsv_YMD}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="아침"
          onPress={() => setSelectedMealType('조식')}
          color={selectedMealType === '조식' ? '#00C4B4' : '#666'}
        />
        <Button
          title="점심"
          onPress={() => setSelectedMealType('중식')}
          color={selectedMealType === '중식' ? '#00C4B4' : '#666'}
        />
        <Button
          title="저녁"
          onPress={() => setSelectedMealType('석식')}
          color={selectedMealType === '석식' ? '#00C4B4' : '#666'}
        />
      </View>

      {loading && <Text style={styles.statusText}>로딩 중...</Text>}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {!loading && !error && filteredMeals.length === 0 && (
        <Text style={styles.statusText}>급식 정보가 없습니다.</Text>
      )}
      {!loading && !error && filteredMeals.length > 0 && (
        <FlatList
          data={filteredMeals}
          renderItem={renderMealItem}
          keyExtractor={(item, index) => `${item.mlsv_YMD}-${index}`}
          style={styles.mealList}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  mealList: {
    flex: 1,
  },
  mealItem: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  mealText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  mealDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  statusText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default HomeScreen;