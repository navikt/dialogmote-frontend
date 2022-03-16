import { ReactElement, useEffect, useRef } from "react";
import { useNotifications } from "@/context/NotificationContext";
import styled from "styled-components";
import { SingleNotification } from "@/common/components/notificationbar/SingleNotification";

const NotificationBarWrapper = styled.div`
  width: 100%;
`;

export const NotificationBar = (): ReactElement | null => {
  const { notification } = useNotifications();

  const notificationBarRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (notification) {
      notificationBarRef.current?.scrollIntoView({
        behavior: "auto",
        block: "start",
      });
    }
  }, [notification]);

  if (!notification) return null;

  return (
    <NotificationBarWrapper ref={notificationBarRef}>
      <SingleNotification notification={notification} />;
    </NotificationBarWrapper>
  );
};
