import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { get, post } from "@/common/api/fetch";
import type { TestScenario } from "@/server/data/mock/getMockDb";

export const useSetActiveTestScenario = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const setActiveTestScenario = (mockSetup: TestScenario) =>
    post(`${router.basePath}/api/scenario/activescenario`, mockSetup);

  return useMutation({
    mutationFn: setActiveTestScenario,
    onSuccess: async () => {
      await queryClient.invalidateQueries();
    },
  });
};

export const useActiveTestScenario = () => {
  const router = useRouter();

  const fetchActiveTestScenario = () =>
    get<TestScenario>(`${router.basePath}/api/scenario/activescenario`);

  return useQuery({
    queryKey: ["active-test-scenario"],
    queryFn: fetchActiveTestScenario,
  });
};
