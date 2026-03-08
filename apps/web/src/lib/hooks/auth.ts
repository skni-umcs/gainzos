import { useMutation } from '@tanstack/react-query';
import { loginUser, registerUser, getUsers, logoutUser, validateUser } from '@/lib/api/auth';
import { User } from '@/lib/types/user';
import { useQuery } from '@tanstack/react-query';

export function useGetUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });
}

export function useRegisterUser() {
  return useMutation({
    mutationKey: ['registerUser'],
    mutationFn: (user: User) => registerUser(user),
  });
}

export function useLoginUser() {
  return useMutation({
    mutationKey: ['loginUser'],
    mutationFn: (user: User) => loginUser(user),
  });
}

export function useLogoutUser() {
  return useMutation({
    mutationKey: ['logoutUser'],
    mutationFn: () => logoutUser(),
  });
}

export function useValidateUser(detailed = false) {
  return useQuery({
    queryKey: ['validateUser', detailed],
    queryFn: () => validateUser(detailed),
  });
}

