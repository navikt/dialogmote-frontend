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

  // biome-ignore lint/correctness/useExhaustiveDependencies: use router.pathname to trigger cleanup on route changes
  useEffect(() => {
    return () => {
      clearNotifications();
    };
  }, [router.pathname, clearNotifications]);

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
