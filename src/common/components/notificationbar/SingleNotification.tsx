import styled from "styled-components";
import { Alert } from "@navikt/ds-react";
import { useEffect } from "react";
import { Notification, useNotifications } from "@/context/NotificationContext";
import { useRouter } from "next/router";

const AlertStyled = styled(Alert)`
  width: 100%;
  justify-content: center;
`;

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
    <AlertStyled fullWidth={true} variant={notification.variant}>
      {notification.message}
    </AlertStyled>
  );
};
