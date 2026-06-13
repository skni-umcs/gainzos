import { axiosInstance } from './config';

export const client = {
  get: <T>(url: string) => axiosInstance.get<T>(url).then(r => r.data),

  post: <T>(url: string, body: unknown) => axiosInstance.post<T>(url, body).then(r => r.data),

  put: <T>(url: string, body: unknown) => axiosInstance.put<T>(url, body).then(r => r.data),

  delete: <T>(url: string) => axiosInstance.delete<T>(url).then(r => r.data),

  patch: <T>(url: string, body: unknown) => axiosInstance.patch<T>(url, body).then(r => r.data),
};
