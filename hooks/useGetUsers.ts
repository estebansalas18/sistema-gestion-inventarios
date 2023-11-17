// useGetUsers.ts
import useSWR, { mutate } from 'swr';
import { API_ROUTES, fetcher } from '@/service/apiConfig';
import { UsersQuery } from '@/types';

const refetchUsers = async () => {
  await mutate(API_ROUTES.users);
};

const useGetUsers = () => {
  const { data, error, isValidating } = useSWR<UsersQuery>(API_ROUTES.users, fetcher);

  return {
    users: data?.users,
    set: refetchUsers, // Puedes cambiar el nombre según tus preferencias
    usersError: error,
    usersLoading: isValidating,
  };
};

export { useGetUsers, refetchUsers };
