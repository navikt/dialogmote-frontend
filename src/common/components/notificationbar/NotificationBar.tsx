import { ReactElement, ReactNode } from "react";
import { Alert } from "@navikt/ds-react";
import { useNotifications } from "@/context/NotificationContext";
import styled from "styled-components";

const AlertStyled = styled(Alert)`
  margin-bottom: 1rem;
  width: 100%;
  justify-content: center;
`;

export const NotificationBar = (): ReactElement => {
  const { notifications } = useNotifications();

  const notificationBars = notifications.map(
    (notification, index): ReactNode => {
      return (
        <AlertStyled
          fullWidth={true}
          key={index}
          variant={notification.variant}
        >
          {notification.message}
        </AlertStyled>
      );
    }
  );

  return <>{notificationBars}</>;
};
