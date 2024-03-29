import { useState, useContext, createContext } from "react";

export interface Notification {
  //Milliseconds
  timeout?: number;
  variant: "error" | "warning" | "info" | "success";
  message: string;
}

type NotificationProviderProps = {
  children: React.ReactNode;
};

type NotificationContextState = {
  notification?: Notification;
  //Custom notification
  displayNotification: (notification: Notification) => void;
  displaySuccessToast: (message: string) => void;
  displayErrorToast: (message: string) => void;
  clearNotifications: () => void;
};

export const NotificationContext = createContext<
  NotificationContextState | undefined
>(undefined);

export const NotificationProvider = ({
  children,
}: NotificationProviderProps) => {
  const [notification, setNotification] = useState<Notification>();

  return (
    <NotificationContext.Provider
      value={{
        notification,
        displayNotification: (notification) => {
          setNotification(notification);
        },
        displaySuccessToast: (message) => {
          setNotification({
            variant: "success",
            message: message,
          });
        },
        displayErrorToast: (message) => {
          setNotification({
            variant: "error",
            message: message,
          });
        },
        clearNotifications: () => setNotification(undefined),
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      `useNotifications must be used within a NotificationProvider`
    );
  }
  return context;
};
