import { useEffect } from "react";
import * as Sentry from "@sentry/react";

const useSentry = () => {
  useEffect(() => {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      environment: location.hostname,
    });
  }, []);
};

export default useSentry;
