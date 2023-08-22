import { ReactElement, useEffect, useRef } from "react";
import { useNotifications } from "@/context/NotificationContext";
import { SingleNotification } from "@/common/components/notificationbar/SingleNotification";

export const NotificationBar = (): ReactElement | null => {
  const { notification } = useNotifications();

  const notificationBarRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (notification) {
      notificationBarRef.current?.scrollIntoView({
        behavior: "auto",
        block: "start",
      });
      notificationBarRef.current?.focus();
    }
  }, [notification]);

  if (!notification) return null;

  return (
    <div className="w-full" ref={notificationBarRef} tabIndex={-1}>
      <SingleNotification notification={notification} />
    </div>
  );
};
