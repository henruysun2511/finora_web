
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { mascotService } from "@/services/mascot.service";
import type { MascotInput } from "@/types/mascot.type";

export const MASCOT_QUERY_KEY = ["admin-mascots"];

export function useGetMascots() {
  return useQuery({
    queryKey: MASCOT_QUERY_KEY,
    queryFn: mascotService.getAll,
  });
}

export function useCreateMascot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MascotInput) =>
      mascotService.create(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: MASCOT_QUERY_KEY,
      }),
  });
}

export function useUpdateMascot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<MascotInput>;
    }) => mascotService.update(id, data),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: MASCOT_QUERY_KEY,
      }),
  });
}

export function useUpdateMascotStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      isActive,
    }: {
      id: string;
      isActive: boolean;
    }) => mascotService.updateStatus(id, isActive),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: MASCOT_QUERY_KEY,
      }),
  });
}

export function useDeleteMascot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      mascotService.remove(id),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: MASCOT_QUERY_KEY,
      }),
  });
}
