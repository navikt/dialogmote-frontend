import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { get, post, TEST_SESSION_ID } from "@/common/api/fetch";
import { isDemoOrLocal } from "@/common/publicEnv";
import type { TestScenario } from "@/server/data/mock/getMockDb";

export const useSetActiveTestScenario = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const setActiveTestScenario = (scenario: TestScenario) => {
    if (isDemoOrLocal && typeof window !== "undefined") {
      localStorage.setItem(TEST_SESSION_ID, uuidv4());
    }

    return post(`${router.basePath}/api/scenario/activescenario`, scenario);
  };

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
