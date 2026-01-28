import { GlobalAlert } from "@navikt/ds-react";
import { useEffect } from "react";
import { Notification, useNotifications } from "@/context/NotificationContext";
import { useRouter } from "next/router";

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

  useEffect(
    () => () => {
      clearNotifications();
    },
    [router.pathname, clearNotifications]
  );

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
