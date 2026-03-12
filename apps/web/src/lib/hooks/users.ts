import { useQuery } from "@tanstack/react-query";
import { api } from "../react-query/api";

export function useGetUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: api.users.getAll,
  });
}