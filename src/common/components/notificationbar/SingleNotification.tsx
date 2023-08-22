import { Alert } from "@navikt/ds-react";
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
    <Alert
      className="w-full justify-center"
      fullWidth={true}
      variant={notification.variant}
      aria-live="polite"
    >
      {notification.message}
    </Alert>
  );
};
