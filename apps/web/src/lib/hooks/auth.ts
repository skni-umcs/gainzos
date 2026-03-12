import { useMutation } from '@tanstack/react-query';
import { api } from '../react-query/api';
import { User } from '../types/user';

export function useRegisterUser() {
  return useMutation({
    mutationKey: ['registerUser'],
    mutationFn: (user: User) => api.auth.register(user),
  });
}

export function useLoginUser() {
  return useMutation({
    mutationKey: ['loginUser'],
    mutationFn: (user: User) => api.auth.login(user.email, user.password),
  });
}

export function useLogoutUser() {
  return useMutation({
    mutationKey: ['logoutUser'],
    mutationFn: () => api.auth.logout(),
  });
}

export function useGetMe() {
  return useMutation({
    mutationKey: ['getMe'],
    mutationFn: () => api.auth.me(),
  });
}

