import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, RenderOptions, screen, Screen } from "@testing-library/react";
import React, { ReactElement, ReactNode } from "react";
import open from "open";
import userEvent from "@testing-library/user-event";
import { NotificationProvider } from "@/context/NotificationContext";

const AllTheProviders = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>{children}</NotificationProvider>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => {
  return {
    user: userEvent.setup({ delay: null }),
    ...render(ui, { wrapper: AllTheProviders, ...options }),
  };
};

export async function openPlayground(screen: Screen): Promise<void> {
  // eslint-disable-next-line testing-library/no-debugging-utils
  await open(screen.logTestingPlaygroundURL());
}

const customScreen = {
  ...screen,
  openPlayground: () => openPlayground(screen),
};

export { customScreen as screen };
export { customRender as render };
