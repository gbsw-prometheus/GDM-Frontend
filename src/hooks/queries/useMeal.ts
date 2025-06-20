import {useQuery} from '@tanstack/react-query';
import {fetchMealData} from '../../api/meal';

function useMeal() {
  return useQuery({
    queryKey: ['meals', 'daily'],
    queryFn: fetchMealData,
    staleTime: 1000 * 60 * 5, // 5분
    retry: 1,
  });
}

export default useMeal;
