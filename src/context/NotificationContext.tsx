import React, { useState } from "react";
import { Notification, NotificationType } from "@/context/Notifications";

type NotificationProviderProps = {
  children: React.ReactNode;
};

type NotificationContextState = {
  notifications: Notification[];
  displayNotification: (notification: Notification) => void;
  displayToast: (notification: Notification) => void;
  clearNotification: (notification: NotificationType) => void;
};

export const NotificationContext = React.createContext<
  NotificationContextState | undefined
>(undefined);

export const NotificationProvider = ({
  children,
}: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const removeNotification = (type: NotificationType) =>
    setNotifications(notifications.filter((n) => n.type !== type));

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        displayNotification: (notification) => {
          const currentNotificationTypes = notifications.map((n) => n.type);
          if (!currentNotificationTypes.includes(notification.type)) {
            setNotifications([...notifications, notification]);
          }
        },
        displayToast: (notification) => {
          const currentNotificationTypes = notifications.map((n) => n.type);
          if (!currentNotificationTypes.includes(notification.type)) {
            setTimeout(() => removeNotification(notification.type), 8000);
            setNotifications([...notifications, notification]);
          }
        },
        clearNotification: (type: NotificationType) => removeNotification(type),
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = React.useContext(NotificationContext);
  if (!context) {
    throw new Error(
      `useNotifications must be used within a NotificationProvider`
    );
  }
  return context;
};
