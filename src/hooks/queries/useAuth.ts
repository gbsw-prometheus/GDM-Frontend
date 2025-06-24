import { useMutation, useQuery } from '@tanstack/react-query';
import { postSignup, postLogin, getProfile, getUser } from '../../api/auth';
import { queryKeys } from '../../constants';
import { UseMutationCustomOptions, User } from '../../types';
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

function useGetUser() {
  return useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_USER],
    queryFn: getUser,
    retry: false,
  });
}

function useAuth() {
  const signupMutation = useSignup();
  const loginMutation = useLogin();
  const getProfileQuery = useGetProfile();
  const getsUser = useGetUser()
  const isLogin = getProfileQuery.isSuccess;
  const user = getProfileQuery.data as User | undefined;
  const role = getsUser.data?.role; // 'TEACHER' | 'STUDENT' | undefined

  return {
    signupMutation,
    loginMutation,
    isLogin,
    user,
    role,
    isLoading: getProfileQuery.isLoading,
    error: getProfileQuery.error,
  };
}

export default useAuth;