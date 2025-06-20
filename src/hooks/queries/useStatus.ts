import {useMutation, useQuery} from '@tanstack/react-query';
import {
  getAbsenceList,
  getGoingList,
  getGoingDetail,
  postGoingRegistration,
  postGoingAccept,
  deleteGoing,
  GoingRegistrationRequest,
} from '../../api/status';
import {queryKeys} from '../../constants';
import {UseMutationCustomOptions} from '../../types';
import queryClient from '../../api/queryClient';

// 미출석 현황 조회
function useGetAbsenceList() {
  return useQuery({
    queryKey: [queryKeys.STATUS, queryKeys.GET_ABSENCE_LIST],
    queryFn: getAbsenceList,
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
  });
}

// 외출/외박 리스트 조회
function useGetGoingList() {
  return useQuery({
    queryKey: [queryKeys.STATUS, queryKeys.GET_GOING_LIST],
    queryFn: getGoingList,
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
  });
}

// 외출/외박 상세 조회
function useGetGoingDetail(id: string) {
  return useQuery({
    queryKey: [queryKeys.STATUS, queryKeys.GET_GOING_DETAIL, id],
    queryFn: () => getGoingDetail(id),
    enabled: !!id,
    retry: 1,
  });
}

// 외출/외박 신청
function useGoingRegistration(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: (body: GoingRegistrationRequest) => postGoingRegistration(body),
    onSuccess: () => {
      // 신청 성공 시 외출/외박 리스트 다시 조회
      queryClient.invalidateQueries({
        queryKey: [queryKeys.STATUS, queryKeys.GET_GOING_LIST],
      });
    },
    ...mutationOptions,
  });
}

// 외출/외박 신청 수락
function useGoingAccept(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: (id: string) => postGoingAccept(id),
    onSuccess: () => {
      // 수락 성공 시 외출/외박 리스트 다시 조회
      queryClient.invalidateQueries({
        queryKey: [queryKeys.STATUS, queryKeys.GET_GOING_LIST],
      });
    },
    ...mutationOptions,
  });
}

// 외출/외박 신청 취소
function useGoingDelete(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: (id: string) => deleteGoing(id),
    onSuccess: () => {
      // 삭제 성공 시 외출/외박 리스트 다시 조회
      queryClient.invalidateQueries({
        queryKey: [queryKeys.STATUS, queryKeys.GET_GOING_LIST],
      });
    },
    ...mutationOptions,
  });
}

function useStatus() {
  const absenceListQuery = useGetAbsenceList();
  const goingListQuery = useGetGoingList();
  const goingRegistrationMutation = useGoingRegistration();
  const goingAcceptMutation = useGoingAccept();
  const goingDeleteMutation = useGoingDelete();

  return {
    // 조회 쿼리
    absenceListQuery,
    goingListQuery,

    // 뮤테이션
    goingRegistrationMutation,
    goingAcceptMutation,
    goingDeleteMutation,

    // 편의 함수
    getGoingDetail: useGetGoingDetail,
  };
}

export default useStatus;
