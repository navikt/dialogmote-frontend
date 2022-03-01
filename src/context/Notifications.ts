export type NotificationType = "submitMotebehovSuccess";

export interface Notification {
  type: NotificationType;
  variant: "error" | "warning" | "info" | "success";
  message: string;
}

export const SubmitMotebehovSuccess: Notification = {
  type: "submitMotebehovSuccess",
  variant: "success",
  message: "Du har sendt svaret ditt på om du ønsker et dialogmøte",
};
