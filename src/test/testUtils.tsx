import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  type RenderOptions,
  render,
  type Screen,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import open from "open";
import type { ReactElement, ReactNode } from "react";
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
  options?: Omit<RenderOptions, "wrapper">,
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
