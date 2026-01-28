import { GlobalAlert } from "@navikt/ds-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  type Notification,
  useNotifications,
} from "@/context/NotificationContext";

interface Props {
  notification: Notification;
}

export const SingleNotification = ({ notification }: Props) => {
  const { clearNotifications } = useNotifications();
  const router = useRouter();

  useEffect(() => {
    if (notification.timeout) {
      const interval = setInterval(() => {
        clearNotifications();
      }, notification.timeout);
      return () => {
        clearInterval(interval);
      };
    }
  }, [clearNotifications, notification]);

  useEffect(() => {
    const handleRouteChange = () => {
      clearNotifications();
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events, clearNotifications]);

  return (
    <GlobalAlert
      className="w-full"
      status={notification.variant}
      aria-live="polite"
    >
      <GlobalAlert.Content>{notification.message}</GlobalAlert.Content>
    </GlobalAlert>
  );
};
