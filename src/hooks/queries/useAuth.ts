import {useMutation, useQuery} from '@tanstack/react-query';
import {postSignup, postLogin, getProfile} from '../../api/auth';
import {queryKeys} from '../../constants';
import {UseMutationCustomOptions} from '../../types';
import queryClient from '../../api/queryClient';

function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    ...mutationOptions,
  });
}

function useLogin(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: () => {
      // 로그인 성공 시 사용자 쿼리 invalidate
      queryClient.invalidateQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
      });
    },
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      });
    },
    ...mutationOptions,
  });
}

function useGetProfile() {
  return useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
    queryFn: getProfile,
    retry: false,
  });
}

function useAuth() {
  const signupMutation = useSignup();
  const loginMutation = useLogin();
  const getProfileQuery = useGetProfile();
  const isLogin = getProfileQuery.isSuccess;

  return {
    signupMutation,
    loginMutation,
    isLogin,
    getProfileQuery,
  };
}

export default useAuth;
