import "../styles/app.css";
import "../styles/inferio-theme.css";
import "../styles/fonts-mono.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { MotionConfig } from "motion/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApiError } from "../api/client";
import { Atmosphere } from "../components/atmosphere";
import { getTheme, setTheme } from "../components/theme";
import { ErrorBoundary } from "../components/error-boundary";
import { ToastProvider } from "../components/toast";
import { initI18n } from "../i18n";
import { adminDicts } from "../i18n/admin";
import { createAppRouter } from "./router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5_000,
      retry: (count, e) => !(e instanceof ApiError && [401, 403, 404].includes(e.status)) && count < 2,
      refetchOnWindowFocus: true,
    },
  },
});

const router = createAppRouter(queryClient);

setTheme(getTheme());

window.addEventListener("mikan:unauthorized", () => {
  if (router.state.location.pathname === "/login") return;
  queryClient.clear();
  void router.navigate({ to: "/login", search: { next: router.state.location.href } });
});

void initI18n(adminDicts).then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <MotionConfig reducedMotion="user">
            <ToastProvider>
              <Atmosphere />
              <RouterProvider router={router} />
            </ToastProvider>
          </MotionConfig>
        </QueryClientProvider>
      </ErrorBoundary>
    </StrictMode>,
  );
});
