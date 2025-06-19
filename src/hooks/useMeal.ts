import { useState, useEffect } from "react";
import axiosInstance from "../api/axios";
import { AxiosError } from "axios";

interface Meal {
  mlsv_YMD: string; // 급식 날짜
  mmeal_SC_NM: string; // 급식 종류 (예: 조식, 중식, 석식)
  ddish_NM: string; // 음식 이름 (원본 HTML 문자열)
  dishes: string[]; // 파싱된 음식 목록
}

interface MealData {
  meals: Meal[];
}

interface MealServiceResponse {
  mealServiceDietInfo: [
    {
      head?: unknown;
      row: Meal[];
    }
  ];
}

function useMeal() {
  const [mealData, setMealData] = useState<MealData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMealData() {
      try {
        const response = await axiosInstance.get<MealServiceResponse>("/api/meals/daily");
        const data = response.data;

        // mealServiceDietInfo와 row가 있는지 확인
        const rawMeals = data.mealServiceDietInfo?.[0]?.row || [];
        // ddish_NM을 파싱하여 dishes 배열 생성
        const meals = rawMeals.map((meal) => ({
          ...meal,
          dishes: meal.ddish_NM
            .replace(/<br\/>/g, "\n") // <br/>를 줄바꿈으로 변환
            .replace(/\s*\([0-9.]*\)/g, "") // 알레르기 정보 제거
            .split("\n")
            .map((dish) => dish.trim())
            .filter((dish) => dish), // 빈 문자열 제거
        }));

        setMealData({ meals });
      } catch (err) {
        const axiosError = err as AxiosError;
        setError("급식 데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    }

    fetchMealData();
  }, []);

  return { mealData, loading, error };
}

export default useMeal;