import { useCallback, useState } from 'react';
import axiosInstance from '../api/axios';
import { AxiosError } from 'axios';
import { NotificationPayload, NotificationResponse, NotificationsResponse } from '../types';

interface UseNoticeReturn {
  createNotification: (payload: NotificationPayload) => Promise<NotificationResponse>;
  getAllNotifications: () => Promise<NotificationsResponse>;
  isLoading: boolean;
  error: string | null;
  errorDetails: string | null;
}

export const useNotice = (): UseNoticeReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  const createNotification = useCallback(async (payload: NotificationPayload) => {
    setIsLoading(true);
    setError(null);
    setErrorDetails(null);

    try {
      const response = await axiosInstance.post<NotificationResponse>(
        '/api/notifications/create',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      setIsLoading(false);
      return response.data;
    } catch (err) {
      setIsLoading(false);
      
      let errorMessage = '예상치 못한 오류가 발생했습니다';
      let detailedError = '';

      if (err instanceof AxiosError) {
        if (err.response) {
          detailedError += `response: ${JSON.stringify(err.response, null, 2)}\n`;
          errorMessage = err.response.data?.message || err.message;
        }
        if (err.request) {
          detailedError += `request: ${JSON.stringify(err.request, null, 2)}\n`;
        }
        if (err.message) {
          detailedError += `message: ${err.message}\n`;
        }
        detailedError += `stringify: ${JSON.stringify(err, null, 2)}`;
      } else {
        errorMessage = (err as Error).message || errorMessage;
        detailedError += `message: ${errorMessage}\n`;
        detailedError += `stringify: ${JSON.stringify(err, null, 2)}`;
      }

      setError(errorMessage);
      setErrorDetails(detailedError);
      throw new Error(errorMessage);
    }
  }, []);

  const getAllNotifications = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setErrorDetails(null);

    try {
      const response = await axiosInstance.get<NotificationsResponse>(
        '/api/notifications/get-all',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      setIsLoading(false);
      return response.data;
    } catch (err) {
      setIsLoading(false);
      
      let errorMessage = '예상치 못한 오류가 발생했습니다';
      let detailedError = '';

      if (err instanceof AxiosError) {
        if (err.response) {
          detailedError += `response: ${JSON.stringify(err.response, null, 2)}\n`;
          errorMessage = err.response.data?.message || err.message;
        }
        if (err.request) {
          detailedError += `request: ${JSON.stringify(err.request, null, 2)}\n`;
        }
        if (err.message) {
          detailedError += `message: ${err.message}\n`;
        }
        detailedError += `stringify: ${JSON.stringify(err, null, 2)}`;
      } else {
        errorMessage = (err as Error).message || errorMessage;
        detailedError += `message: ${errorMessage}\n`;
        detailedError += `stringify: ${JSON.stringify(err, null, 2)}`;
      }

      setError(errorMessage);
      setErrorDetails(detailedError);
      throw new Error(errorMessage);
    }
  }, []);

  return { createNotification, getAllNotifications, isLoading, error, errorDetails };
};