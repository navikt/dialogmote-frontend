import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get, post } from "../axios/axios";
import { useRouter } from "next/router";
import { TestScenario } from "@/server/data/mock/getMockDb";

export const useSetActiveTestScenario = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const setActiveTestScenario = (mockSetup: TestScenario) =>
    post(`${router.basePath}/api/scenario/activescenario`, mockSetup);

  return useMutation(setActiveTestScenario, {
    onSuccess: async () => {
      await queryClient.invalidateQueries();
    },
  });
};

export const useActiveTestScenario = () => {
  const router = useRouter();

  const fetchActiveTestScenario = () =>
    get<TestScenario>(`${router.basePath}/api/scenario/activescenario`);

  return useQuery<TestScenario, Error>(
    ["active-test-scenario"],
    fetchActiveTestScenario
  );
};
