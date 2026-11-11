
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { userService } from "@/services/user.service";
import type { UserParams } from "@/types/user.type";
import type { UserInput } from "@/schemas/user.schema";

export const USER_QUERY_KEY = ["users"];
export const ROLE_QUERY_KEY = ["roles"];

export const useGetUsers = (params: UserParams) =>
  useQuery({
    queryKey: [...USER_QUERY_KEY, params],
    queryFn: () => userService.getUsers(params),
    placeholderData: (previous) => previous,
  });

export const useGetUser = (id: string | null) =>
  useQuery({
    queryKey: [...USER_QUERY_KEY, "detail", id],
    queryFn: () => userService.getUserById(id!),
    enabled: !!id,
  });

export const useGetRoles = (enabled = true) =>
  useQuery({
    queryKey: ROLE_QUERY_KEY,
    queryFn: userService.getRoles,
    enabled,
  });

export const useUpdateUser = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<UserInput>;
    }) => userService.updateUser(id, data),

    onSuccess: () =>
      client.invalidateQueries({
        queryKey: USER_QUERY_KEY,
      }),
  });
};

export const useDeleteUser = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: userService.deleteUser,

    onSuccess: () =>
      client.invalidateQueries({
        queryKey: USER_QUERY_KEY,
      }),
  });
};

export const useAssignUserRoles = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      roleIds,
    }: {
      id: string;
      roleIds: string[];
    }) => userService.assignRoles(id, roleIds),

    onSuccess: () =>
      client.invalidateQueries({
        queryKey: USER_QUERY_KEY,
      }),
  });
};
