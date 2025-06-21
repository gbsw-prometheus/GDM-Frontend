// types/index.ts
export interface NotificationPayload {
  title: string;
  detail: string;
}

export interface NotificationResponse {
  success: boolean;
  message?: string;
}

export interface Notification {
  id: number;
  title: string;
  detail: string;
  dueDate: string; // 예: "2025-06-21"
  author: string;
}

export interface NotificationsResponse {
  content: Notification[];
  totalPages: number;
  size: number;
}