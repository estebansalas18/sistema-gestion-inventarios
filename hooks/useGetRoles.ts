import { API_ROUTES, fetcher } from '@/service/apiConfig';
import { RolesQuery } from '@/types';
import useSWR from 'swr';

const useGetRoles = () => {
  const { data, isLoading } = useSWR<RolesQuery>(API_ROUTES.rolesSupabase, fetcher);

  return { roles: data?.roles, rolesLoading: isLoading };
};

export { useGetRoles };