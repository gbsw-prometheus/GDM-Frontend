import axiosInstance from './axios';

export interface Meal {
  mlsv_YMD: string; // 급식 날짜
  mmeal_SC_NM: string; // 급식 종류 (예: 조식, 중식, 석식)
  ddish_NM: string; // 음식 이름 (원본 HTML 문자열)
  dishes: string[]; // 파싱된 음식 목록
}

interface MealServiceResponse {
  mealServiceDietInfo: [
    {
      head?: unknown;
      row: Meal[];
    },
  ];
}

export const fetchMealData = async (): Promise<{meals: Meal[]}> => {
  const response = await axiosInstance.get<MealServiceResponse>(
    '/api/meals/daily',
  );
  const data = response.data;
  const rawMeals = data.mealServiceDietInfo?.[0]?.row || [];
  const meals = rawMeals.map(meal => ({
    ...meal,
    dishes: meal.ddish_NM
      .replace(/<br\/>/g, '\n')
      .replace(/\s*\([0-9.]*\)/g, '')
      .split('\n')
      .map(dish => dish.trim())
      .filter(dish => dish),
  }));
  return {meals};
};
