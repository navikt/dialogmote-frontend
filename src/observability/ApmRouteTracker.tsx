import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { trackBrowserRoute } from "./browser";
import { setCurrentBrowserPage } from "./routes";

export const ApmRouteTracker = () => {
  const { pathname } = useRouter();
  const route = setCurrentBrowserPage(pathname);
  const previousRoute = useRef<string>(undefined);

  useEffect(() => {
    if (previousRoute.current === route) return;
    trackBrowserRoute(route, previousRoute.current);
    previousRoute.current = route;
  }, [route]);

  return null;
};
