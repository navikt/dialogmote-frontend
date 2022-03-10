import styled from "styled-components";
import { Alert } from "@navikt/ds-react";
import { useEffect } from "react";
import { Notification, useNotifications } from "@/context/NotificationContext";

const AlertStyled = styled(Alert)`
  width: 100%;
  justify-content: center;
`;

interface Props {
  notification: Notification;
}

export const SingleNotification = ({ notification }: Props) => {
  const { clearNotifications } = useNotifications();

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

  return (
    <AlertStyled fullWidth={true} variant={notification.variant}>
      {notification.message}
    </AlertStyled>
  );
};
